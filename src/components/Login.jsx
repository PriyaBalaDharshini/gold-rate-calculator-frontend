import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../utlis/AxiosService';
import ApiRoutes from '../utlis/ApiRoutes';
import { toast } from 'react-toastify';
import backgroundImage from '../../public/assets/signin.avif'

function Login() {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`, // Set background image
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    };
    let navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            let res = await AxiosService.post(ApiRoutes.LOG_IN.path, { email, password })
            if (res.status == 200) {
                sessionStorage.setItem('token', res.data.token);
                toast.success("Login Successfull")
                navigate("/dashboard")
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error?.response?.data?.message || error.message)
        }

    }
    return (
        <div className='login-container' style={backgroundStyle}>
            <div className="login-page">
                <h4 style={{ color: "darkblue", marginBottom: "20px" }}>Login to Continue</h4>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Login
                    </Button>
                    <p className='mt-4'>Don't have accout? <a href="/add-user">Signin</a> to continue</p>
                    <p>Forgot Password? <a href="/forgot-password">Click here</a> to reset the password</p>
                </Form>
            </div>
        </div>
    )
}

export default Login