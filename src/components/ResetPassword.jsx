import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AxiosService from '../utlis/AxiosService';
import ApiRoutes from '../utlis/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ResetPassword() {
    let { token } = useParams();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState()
    const navigate = useNavigate()

    console.log(token);

    const handleChnage = async (e) => {
        try {
            e.preventDefault();

            let res = await AxiosService.put(ApiRoutes.RESET_PASSWORD.path, { password, token })
            if (res.status == 200) {
                alert(res.data.message)
                navigate("/login")
            }
        } catch (error) {

            toast.error(error?.response?.data?.message || error.message)
        }
    }
    return (
        <div className='signin-wrapper mt-5 pt-5'>
            <h4>Reset Your Password</h4>
            <Form onSubmit={handleChnage}>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="success" type="submit" className='mt-4'>
                    Sumbit
                </Button>
            </Form>

        </div>
    )
}

export default ResetPassword