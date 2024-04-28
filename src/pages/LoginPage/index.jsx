import { useEffect } from "react";
import Form from "./Form";
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from "react-router";
import './Login.css';

function LoginPage() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn) {

            navigate('/home');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="loginPage">
            <div className="container">

                <div className="section">
                    <div className="text">
                        <h1 style={{ textDecoration: 'line-through' }}>Hello World!</h1>
                        <h2 style={{ marginBottom: '50px' }}>Welcome to the <span>LazyCoder</span>,</h2>
                        <p style={{ lineHeight: '1.6', fontFamily: 'poppins' }}>
                            a social media/platform built by developers for developers.
                            Here you can share, post and learn everything about programming.
                            You can begin by sharing an idea about a project and get feedback from other developers.
                            Post your gitHub link, a screenshot of your webpage or just a snap of code. There are no limits!
                        </p>
                        <button>START SHARING</button>
                    </div>
                    <img src="/sloth-copy.png" alt="devImage" class="login-img" width={250}/>
                        <div class="d3-container"> 
                            <img src="/Black Clay Isometric Apple Devices.png" alt="" class="mac" width={400}/>
                            <img src="/Camera0003.png" alt="" class="camera" width={250}/>
                            <img src="/Color_Wheel_with_Dropper0002.png" alt="" class="wheel" width={300}/>
                            <img src="/Folder0003.png" alt="" class="folder" width={250}/>
                            <img src="/sloth.png" alt="devImage" class="sloth" width={250}/>
                            <img src="/Cursor_Small_Vertical0002.png" alt="" class="cursor" width={130}/>
                        </div>
                </div>
            </div>
            <div className="form">
                <div className="formTitle">
                    <h2>Join the club</h2>
                    <h3><span>it's free!</span></h3>
                </div>
                <Form />
            </div>
        </div>
    )
}

export default LoginPage;