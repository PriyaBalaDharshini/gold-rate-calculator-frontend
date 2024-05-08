import React, { useState, useEffect } from 'react'
import gif from '../../public/assets/gold-stone.gif'
import image2 from '../../public/assets/2.png'
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLogout } from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import Chart from './Chart';
import info from '../data.json';

function Dashboard() {
    const [karat, setKarat] = useState("");
    const [goldweight, setGoldweight] = useState(0);
    const [additionalCharges, setadditionalCharges] = useState(0);
    const [selectDate, setSelectDate] = useState("");
    const [totalValue, setTotalValue] = useState("");
    const [todayGoldRate, setTodayGoldRate] = useState(0);

    const logout = useLogout();
    const navigate = useNavigate();

    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
        let currentDate = new Date().getDate();
        let currentMonth = new Date().getMonth() + 1;
        let currentYear = new Date().getFullYear()
        if (currentMonth / 10 < 1) {
            var month = `0${currentMonth}`
        }
        if (currentDate / 10 < 1) {
            var date = `0${currentDate}`
        }
        let today = `${currentYear}-${month}-${date}`


        info.forEach(ele => {

            if (ele.date === today) {
                setTodayGoldRate(ele.rate);

            }
        })
    }, []);

    const calculateGoldRate = () => {
        info.forEach(ele => {
            if (ele.date === selectDate) {
                setTodayGoldRate(ele.rate);
                let pricePerGram = ele[karat]
                console.log(pricePerGram);
                const totalValue = (pricePerGram * goldweight) + ((pricePerGram * goldweight * additionalCharges) / 100)
                setTotalValue(totalValue);
            }
        })

    }
    return (

        <div className='gold-rate-converter grd-container'>
            <div className="grd-page">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <img src={image2} alt="" style={{ height: "100px", width: "100px" }} />
                    <h3>Calculate Today's Gold Rate</h3>
                </div>
                <div className="box">
                    <div className="box-1">
                        <Form>
                            <h3 style={{ fontSize: " 20px " }}>Todays's Gold Rate per gram: {todayGoldRate} </h3>
                            <Form.Group className="mb-3">
                                <Form.Label>Select Karat :</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    value={karat}
                                    onChange={(e) => setKarat(e.target.value)}
                                >
                                    <option>Select Option</option>
                                    <option value="rate_24k">24k</option>
                                    <option value="rate_22k">22k</option>

                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3"
                                id="goldweight"
                                value={goldweight}
                                onChange={(e) => setGoldweight(e.target.value)}
                            >
                                <Form.Label>Gold Weight: </Form.Label>
                                <Form.Control type="number" placeholder="Enter number" />
                                <Form.Text className="text-muted">
                                    Enter Gold Weight in Grams
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3"
                                id="additionalCharges"
                                value={additionalCharges}
                                onChange={(e) => setadditionalCharges(e.target.value)}
                            >
                                <Form.Label>Additional Charges : </Form.Label>
                                <Form.Control type="number" placeholder="Enter number" />
                                <Form.Text className="text-muted">
                                    Enter Additional Charges in Percentage (%)
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="date">
                                <Form.Label>Date: </Form.Label>
                                <Form.Control
                                    type="date"
                                    selected={selectDate}
                                    onChange={(e) => setSelectDate(e.target.value)
                                    }
                                    max={new Date().toISOString().split("T")[0]}
                                    min={"2024-01-01"}
                                />
                            </Form.Group>

                        </Form>

                        <Button onClick={() => calculateGoldRate()} variant="info">Calculate</Button>

                        <div className="result-container">
                            <h6>Final Value: {totalValue}</h6>
                        </div>

                    </div>
                    <div className="box-2">
                        <img src={gif} alt="" style={{ width: "400px", height: "200px" }} />
                        <p style={{ marginTop: "10px" }}>Here's how we calculate the value:</p>
                        <p style={{ fontWeight: "bold" }}>To calculate the total value, we use the following formula:</p>
                        <p>Total Value =
                            (Gold Weight * Gold Price per Gram) * (Gold Weight * Gold Price per Gram * Additional Charges / 100)</p>
                        <p style={{ fontWeight: "bold" }}>Explanation of variables:</p>
                        <ul style={{ listStyle: "none" }}>
                            <li>Gold Weight : The weight of gold in grams</li>
                            <li>Gold Price per Gram : The current price of gold per gram based on the selected karat</li>
                            <li>Additional Charges : Any additional charges, such as making charges or taxes, in percentage</li>
                        </ul>
                        <p>This is we calculate the total value of the gold.</p>
                    </div>
                </div>
                <div className="box-3">
                    <Chart />

                </div>
                <div className="logout mt-3 py-3 text-center">
                    <Button onClick={logout} variant="warning">Logout</Button>
                </div>
            </div>
        </div >
    )
}

export default Dashboard