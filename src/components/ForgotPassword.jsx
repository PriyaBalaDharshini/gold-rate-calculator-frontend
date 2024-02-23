import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AxiosService from '../utlis/AxiosService';
import ApiRoutes from '../utlis/ApiRoutes';
import { toast } from 'react-toastify';


function ForgotPassword() {
    const [email, setEmail] = useState()
    console.log(email);
    const handleChange = async (e) => {
        try {
            e.preventDefault();

            let res = await AxiosService.post(ApiRoutes.FORGOT_PASSWORD.path, { email })
            if (res.status == 200) {
                console.log(res.data.message);
                toast.success(res.data.message)

            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    return (
        <div className='signin-wrapper mt-5 pt-5'>
            <h4>Enter Email to Reset Your Password</h4>
            <Form onSubmit={handleChange}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button variant="success" type="submit" className='mt-4'>
                        Sumbit
                    </Button>
                </Form.Group>
            </Form>

        </div>
    )
}

export default ForgotPassword