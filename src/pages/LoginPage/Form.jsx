import { Button, TextField } from "@mui/material";
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

    return (
        <form onSubmit={handleFormSubmit}>
           <TextField 
            label="Full Name"
            onChange={handleChange}
            value={firstName}
            name="fullName"
           />
           <TextField 
            label="User Name"
            onChange={handleChange}
            value={firstName}
            name="userName"
           />
           <TextField 
            label="email"
            onChange={handleChange}
            value={email}
            name="email"
           />
           <TextField 
            label="password"
            onChange={handleChange}
            value={password}
            name="password"
           />
            <Button type="submit"/>
        </form>
    )
}

export default Form;