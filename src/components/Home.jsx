import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner'
import backgroundImage from '../../public/assets/welcome.jpg'

function Home() {
    let navigate = useNavigate()
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`, // Set background image
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    };

    return (
        <div className="home-container" style={backgroundStyle}>
            <div className='home-page'>
                <h4 style={{ fontWeight: "bold", fontSize: "18px" }}>Welcome</h4>
                <p>to</p>
                <h3>Online Gold Rate Calculator</h3>
                <div className='mt-3 py-3'>
                    <p style={{ marginTop: "20px", fontWeight: "bold", fontSize: "18px" }}>Dont have account?</p>
                    <Button className='signin' variant="success" onClick={() => navigate("/add-user")}>Signin</Button>
                    <p style={{ marginTop: "20px", fontWeight: "bold", fontSize: "18px" }}>Already Have account?</p>
                    <Button className='signin' variant="danger" onClick={() => navigate("/login")}>Login</Button>
                </div>
                <div className='spinner'>
                    <Triangle
                        visible={true}
                        height="80"
                        width="80"
                        color="#9F2B64"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </div>
        </div >
    )
}

export default Home