import { FormLabel, TextField } from "@mui/material";
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
            <FormLabel>Full Name</FormLabel>
           <TextField 
            onChange={handleChange}
            value={fullName}
            name="fullName"
           />
           <FormLabel>User Name</FormLabel>
           <TextField 
            onChange={handleChange}
            value={userName}
            name="userName"
           />
           <FormLabel>Email</FormLabel>
           <TextField 
            onChange={handleChange}
            value={email}
            name="email"
           />
           <FormLabel>Password</FormLabel>
           <TextField 
            onChange={handleChange}
            value={password}
            name="password"
           />
            <button type="submit">SIGN UP</button>
        </form>
    )
}

export default Form;