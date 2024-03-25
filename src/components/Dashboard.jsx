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
    const [karat, setKarat] = useState("price_gram_24k");
    const [currency, setCurrency] = useState("");
    const [goldweight, setGoldweight] = useState(0);
    const [additionalCharges, setadditionalCharges] = useState(0);
    const [date, setDate] = useState("");
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
        let today = `${currentYear}-${month}-${currentDate}`

        info.forEach(ele => {
            if (ele.date === today) {
                setTodayGoldRate(ele.rate);
            }
        })
    }, []);
    console.log(info);



    const calculateGoldRate = () => {
        console.log(date);
        let formattedDate = date.split("-").join("");
        console.log(formattedDate);

        var myHeaders = new Headers();
        myHeaders.append("x-access-token", "goldapi-6kzrlswysdkt-io");
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://www.goldapi.io/api/XAU/${currency}/${formattedDate}`, requestOptions)
            .then(response => response.json())
            .then(response => {
                const result = response;
                console.log(result);

                const pricePerGram = result[karat];
                console.log(pricePerGram);
                const totalValue = (pricePerGram * goldweight) + ((pricePerGram * goldweight * additionalCharges) / 100);

                setTotalValue(totalValue.toFixed(2));
                setRate(todayGoldRate);
            })
            .catch(error => console.log('error', error));
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
                            <p>Todays's Gold Rate per gram: {todayGoldRate} </p>
                            <Form.Group className="mb-3">
                                <Form.Label>Select Karat :</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    value={karat}
                                    onChange={(e) => setKarat(e.target.value)}
                                >
                                    <option value="price_gram_24k">24k</option>
                                    <option value="price_gram_22k">22k</option>
                                    <option value="price_gram_21k">21k</option>
                                    <option value="price_gram_20k">20k</option>
                                    <option value="price_gram_18k">18k</option>
                                    <option value="price_gram_16k">16k</option>
                                    <option value="price_gram_14k">14k</option>
                                    <option value="price_gram_10k">10k</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Select Currency :</Form.Label>
                                <Form.Select
                                    id="currency"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                >
                                    <option value="USD">USD - United States Dollar</option>
                                    <option value="AUD">AUD - Australian Dollar</option>
                                    <option value="GBP">GBP - British Pound Sterling</option>
                                    <option value="EUR">EUR - Euro</option>
                                    <option value="CHF">CHF - Swiss Franc</option>
                                    <option value="CAD">CAD - Canadian Dollar</option>
                                    <option value="JPY">JPY - Japanese Yen</option>
                                    <option value="KRW">KRW - South Korean Won</option>
                                    <option value="INR">INR - Indian Rupee</option>
                                    <option value="CNY">CNY - Chinese Yuan</option>
                                    <option value="ZAR">ZAR - South African Rand</option>
                                    <option value="THB">THB - Thai Baht</option>
                                    <option value="SGD">SGD - Singapore Dollar</option>
                                    <option value="HKD">HKD - Hong Kong Dollar</option>
                                    <option value="CZK">CZK - Czech Koruna</option>
                                    <option value="RUB">RUB - Russian Ruble</option>
                                    <option value="PLN">PLN - Polish Zloty</option>
                                    <option value="MYR">MYR - Malaysian Ringgit</option>
                                    <option value="AED">AED - Emirati Dirham</option>
                                    <option value="KWD">KWD - Kuwaiti Dinar</option>
                                    <option value="EGP">EGP - Egyptian Pound</option>
                                    <option value="OMR">OMR - Omani Rial</option>
                                    <option value="SAR">SAR - Saudi Riyal</option>
                                    <option value="MXN">MXN - Mexican Peso</option>
                                    <option value="JOD">JOD - Jordanian Dinar</option>
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
                                    selected={date}
                                    onChange={(e) => setDate(e.target.value)
                                    }
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