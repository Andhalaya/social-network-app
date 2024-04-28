import { useState } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import {API_DOMAIN} from "../../utils/api-domain" 


const initialForm = {
    fullName: "",
    userName: "",
    email: "",
    password: "",
    location: "Anywhere",
    gitHub: "www.github.com", 
    occupation: "fulltime LazyCoder"
}

function Form() {
    const [pageType, setPageType] = useState("login");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState();
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const navigation = useNavigate();
    const { login } = useAuth(); 
    
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
                const response = await axios.post(`${API_DOMAIN}/auth/register`, formData);
                console.log("Response:", response.data);
                setFormData(initialForm);
                setErrors();
                setRegistrationSuccess(true);
            } catch (error) {
                setErrors(error.response.data.errors);
            }
        } else if (pageType === "login") {
            try {
                const response = await axios.post(`${API_DOMAIN}/auth/login`, formData);
                console.log("Response:", response.data);
                localStorage.setItem('token', response.data.token)
                login(response.data.token); 
                navigation("/home");
            } catch (error) {
                setInvalidCredentials(true);
            }
        }
    };

    const handleLoginClick = () => {
        setPageType("login");
        setErrors();
        setRegistrationSuccess(false);
        setFormData(initialForm);
    };

    const handleRegisterClick = () => {
        setPageType("register");
        setErrors();
        setRegistrationSuccess(false);
    };
 
    const guestCredentials = {
        email: import.meta.env.VITE_GUEST_EMAIL,
        password: import.meta.env.VITE_GUEST_PASSWORD
    };

    const handleLoginAsGuest = async() => {
        try{
            const res = await axios.post(`${API_DOMAIN}/auth/login`, guestCredentials);
            localStorage.setItem('token', res.data.token)
            login(res.data.token); 
            navigation("/home");
            
        }catch(error){
            setInvalidCredentials(true)
        }
    }

    return (
        <>
            <div>
                {errors
                    ? errors.map((error) => (
                        <li key={error.msg}>
                            {error.msg}
                        </li>
                    ))
                    : registrationSuccess && (
                        <Alert variant="filled" severity="success">
                            Registration successful!
                        </Alert>
                    )}
            </div>
            <div>
               {invalidCredentials &&(
                  <Alert variant="filled" severity="error">
                  Invalid credentials.
                </Alert>
               )} 
            </div>
            <form onSubmit={handleFormSubmit}>
                {pageType === "register" && (
                    <>
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
                    </>
                )}
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
                <button type="submit">
                    {pageType === "login" ? "Login" : "Register"}
                </button>
                {pageType=== "login" && 
                    (<button onClick={handleLoginAsGuest}>Sign in as guest user</button>) }
                <p onClick={pageType === "login" ? handleRegisterClick : handleLoginClick}>
                    {pageType === "login" ? (
                        <>
                            Don't have an account? Register <span style={{ cursor: 'pointer' }}>here</span>.
                        </>
                    ) : (
                        <>
                            Already have an account? Login <span style={{ cursor: 'pointer' }}>here</span>.
                        </>
                    )}
                </p>
                
            </form>
        </>
    )
}

export default Form;
