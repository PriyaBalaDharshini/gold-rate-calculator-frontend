import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../utlis/AxiosService';
import ApiRoutes from '../utlis/ApiRoutes';
import { toast } from 'react-toastify';
import backgroundImage from '../../public/assets/signin.avif'

function Signin() {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`, // Set background image
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {

        try {
            e.preventDefault()
            const formData = new FormData(e.target);
            const formProps = Object.fromEntries(formData)
            /* console.log(formProps); */
            let res = await AxiosService.post(ApiRoutes.SIGN_IN.path, formProps, {
                authenticate: ApiRoutes.SIGN_IN.authenticate,
            });

            if (res.status === 200) {
                sessionStorage.setItem('token', res.data.token)
                toast.success("Details added Successfully")
                navigate("/login")
            }

        } catch (error) {
            console.error('Error:', error);
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    return (
        <div className='signin-container' style={backgroundStyle}>
            <div className="singin-page">
                <h4 style={{ color: "darkblue", marginBottom: "20px" }}>Signin to Continue</h4>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" name='name' />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="phone" placeholder="Enter phone number" name='phone' />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email' />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password' />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <p className='form-para py-4 '>Already Have Accout? <a href="/login">Login</a> to continue</p>
            </div>
        </div>
    )

}

export default Signin