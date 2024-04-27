import { useTheme } from "../context/theme";
import { useAuth } from '../context/AuthProvider';
import { useState } from 'react'
import axios from "axios";
import { API_DOMAIN } from "../utils/api-domain";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SaveIcon from '@mui/icons-material/Save';
import AnimatedBox from "../components/Box";
import * as Icons from "../utils/Icons"

function ProfileBox() {
    const { theme } = useTheme();
    const { token, user, setUser } = useAuth();
    const [editable, setEditable] = useState(false);
    const [isImage, setIsImage] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        location: user.location,
        occupation: user.occupation,
        github: user.github
    });
    const [formDataChanged, setFormDataChanged] = useState(false);

    const handleToggleEdit = () => {
        setEditable((prevEditable) => !prevEditable);
        setIsImage(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        setFormDataChanged(true);
    };

    const handleSave = async () => {
        try {
            if (!formDataChanged) return;

            const formDataToSend = new FormData();
            formDataToSend.append('id', formData.id);
            formDataToSend.append('fullName', formData.fullName);
            formDataToSend.append('userName', formData.userName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('occupation', formData.occupation);
            formDataToSend.append('github', formData.github);
            if (selectedImage) {
                formDataToSend.append('profilePicture', selectedImage);
            }

            const response = await axios.patch(`${API_DOMAIN}/users/profile`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setFormDataChanged(false);
            setEditable(false);
            setIsImage(false);


            setUser(response.data.user);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const fields = [
        { name: "fullName", label: "Full Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "location", label: "Location", type: "text" },
        { name: "occupation", label: "Occupation", type: "text" },
        { name: "github", label: "GitHub", type: "text", link: true }
    ];

    return (
        <AnimatedBox>
        <div className={`profile-box }`}>
            <div className="space-between margin-bottom">
            <p className={`poppins h4 bold ${theme}`}>@{`${user.userName}`}</p>
                <div onClick={handleToggleEdit}>
                    {editable ? <Icons.FaRegSave className={`icon ${theme}`} onClick={handleSave} /> : <Icons.FiEdit2 className={`icon ${theme}`} />}
                </div>
            </div>
            {fields.map((field) => (
                <div style={{marginBottom:'10px'}} key={field.name}>
                    <p>{field.label}:</p>
                    {editable ? (
                        field.link ? (
                            <input className="profile-input" type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange} />
                        ) : (
                            <input className="profile-input" type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange} />
                        )
                    ) : (
                        field.link ? (
                            <a href={formData[field.name]}>{formData[field.name]}</a>
                        ) : (
                            <p className={`typography2 ${theme}`}>{formData[field.name]}</p>
                        )
                    )}
                </div>
            ))}
            {editable && isImage &&
                <div>
                    <p>Change Profile Picture</p>
                    <input type="file" name="profilePicture" onChange={(e) => { setImage(e.target.files[0]) }} />
                </div>
            }
        </div>
        </AnimatedBox>
    )
}

export default ProfileBox;