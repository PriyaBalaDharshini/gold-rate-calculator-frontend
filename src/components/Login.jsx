import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../utlis/AxiosService';
import ApiRoutes from '../utlis/ApiRoutes';
import { toast } from 'react-toastify';

function Login() {
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
        <div className='signin-wrapper mt-5 pt-5'>
            <h4>Login</h4>
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
                <p className='py-4'>Don't have accout? <a href="/add-user">Signin</a> to continue</p>
                <p>Forgot Password? <a href="/forgot-password">Click her</a> to reset the password</p>
            </Form>
        </div>
    )
}

export default Login