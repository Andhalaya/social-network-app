import { useState } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';

const initialForm = {
    fullName: "",
    userName: "",
    email: "",
    password: ""
}

function Form() {
    const [pageType, setPageType] = useState("register");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (pageType === "register") {
            try {
                const response = await axios.post("http://localhost:3023/auth/register", formData);
                console.log("Response:", response.data);
                setFormData(initialForm)
                setErrors();
                setRegistrationSuccess(true);

            } catch (error) {
                setErrors(err.response.data.errors);
            }
        } else if (pageType === "login") {
            console.log("Login form submitted with data:", formData);
        }
    };
    const handleLoginClick = () => {
        setPageType("login");
        setRegistrationSuccess(false);
    };

    const handleRegisterClick = () => {
        setPageType("register");
        setRegistrationSuccess(false);
    };

    return (
        <>
            {registrationSuccess && <Alert variant="filled" severity="success">
                Successfully registered.
            </Alert>}

            <form onSubmit={handleFormSubmit}>
                <label>FULL NAME</label>
                <input
                    onChange={handleChange}
                    value={formData.fullName}
                    name="fullName"
                />
                <label>USER NAME</label>
                <input
                    onChange={handleChange}
                    value={formData.userName}
                    name="userName"
                />
                {pageType === "login" && (
                    <>
                        <label>EMAIL</label>
                        <input
                            onChange={handleChange}
                            value={formData.email}
                            name="email"
                        />
                        <label>PASSWORD</label>
                        <input
                            onChange={handleChange}
                            value={formData.password}
                            name="password"
                            type="password"
                        />
                    </>
                )}
                <button type="submit">
                    {pageType === "register" ? "Login" : "Register"}
                </button>
                <p onClick={pageType === "login" ? handleRegisterClick : handleLoginClick}>
                    {pageType === "login" ? (
                        <>
                            Already have an account? Login <span style={{ cursor: 'pointer' }}>here</span>.
                        </>
                    ) : ( 
                        <>
                            Don't have an account? Register <span style={{ cursor: 'pointer' }}>here</span>.
                        </>
                       
                    )}
                </p>
            </form>
        </>
    )
}

export default Form;