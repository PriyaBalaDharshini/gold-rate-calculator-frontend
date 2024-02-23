import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner'

function Home() {
    let navigate = useNavigate()
    

    return (
        <div className="home-container">
            <div className='signin-wrapper text-center mt-3 py-3'>
                <h4>Welcome</h4>
                <p>to</p>
                <h3>Online Gold Rate Calculator</h3>
                <div className='mt-3 py-3'>
                    <p style={{ marginTop: "20px" }}>Dont have account?</p>
                    <Button variant="info" onClick={() => navigate("/add-user")}>Signin</Button>
                    <p style={{ marginTop: "20px" }}>Already Have account?</p>
                    <Button variant="success" onClick={() => navigate("/login")}>Login</Button>
                </div>
                <div className='spinner'>
                    <Triangle
                        visible={true}
                        height="80"
                        width="80"
                        color="#9F2B68"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </div>
        </div>
    )
}

export default Home