import { TextField } from "@mui/material";
import { useState } from "react";

function Form () {
    const [formData, setFormData] = useState({
        fullName: "",
        userName: "",
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted form with data:", formData);
    };

    const { fullName, userName, email, password } = formData;

    return (
        <form onSubmit={handleFormSubmit}>
           <label>FULL NAME</label>
           <input 
            onChange={handleChange}
            value={fullName}
            name="fullName"
           />
           <label>USER NAME</label>
           <input 
            onChange={handleChange}
            value={userName}
            name="userName"
           />
           <label>EMAIL</label>
           <input 
            onChange={handleChange}
            value={email}
            name="email"
           />
           <label>PASSWORD</label>
           <input
            onChange={handleChange}
            value={password}
            name="password"
           />
            <button type="submit">SIGN UP</button>
        </form>
    )
}

export default Form;