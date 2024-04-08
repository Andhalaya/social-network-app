import { useState } from "react";
import Form from "./Form";


function LoginPage() {

    return (
        <div className="loginPage">
            <div className="container">
                <h1 style={{ textDecoration: 'line-through' }}>Hello World!</h1>
                <div className="section">
                    <div>
                        <h2 style={{ marginBottom: '50px' }}>Welcome to the <span>LazyCoder</span>,</h2>
                        <p style={{ lineHeight: '2.3' }}>
                            a social media/platform built by developers for developers.
                            Here you can share, post and learn everything about programming.
                            You can begin by sharing an idea about a project and get feedback from other developers.
                            Post your gitHub link, a screenshot of your webpage or just a snap of code. There are no limits!
                        </p>
                        <button>START SHARING</button>
                    </div>

                    <img src="src\assets\loginImage.jpg" alt="devImage" width={400} />

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