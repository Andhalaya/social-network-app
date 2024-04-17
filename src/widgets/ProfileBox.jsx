import { useTheme } from "../context/theme";
import { useAuth } from '../context/AuthProvider';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import { API_DOMAIN } from "../utils/api-domain";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SaveIcon from '@mui/icons-material/Save';

function ProfileBox() {
    const { theme } = useTheme();
    const { token, user, setUser } = useAuth();
    const [projects, setProjects] = useState([]);
    const [editable, setEditable] = useState(false);
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

    const handleToggleEdit = () => {
        setEditable((prevEditable) => !prevEditable);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePicture') {
            setSelectedImage(files[0]);
            setFormData({
                ...formData,
                [name]: files[0] 
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSave = async () => {
        try {
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
            setEditable(false);
            console.log(response)
            setUser(prevUser => ({
                ...prevUser,
                profilePicture: response.data.profilePicture
            }));
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${API_DOMAIN}/projects`,
                    { headers: { Authorization: `Bearer ${token}` } });
                console.log(res.data)
                setProjects(res.data)
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        }
        fetchProjects();
    }, []);

    return (
        <div>
            <div className='profile-background'>
                <img src="1517636940967.jpeg" alt="" />
            </div>
            <div className={`box ${theme} profile`} >
                <div className="space-between">
                    <div className="inline-left" style={{ gap: '5px' }}>
                        <img src={`${API_DOMAIN}/${user.profilePicture}`} alt="name" style={{ borderRadius: 40, width: "70px" }} />
                        <div>
                            <h4>{`@${user.userName}`}</h4>
                            <h6>{user.fullName}</h6>
                        </div>
                    </div>
                    <p>0 followers</p>
                    <p>0 following</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: ' 20px', flexWrap: 'wrap' }}>
                    <div>
                        <h4>Settings</h4>
                        <div className="column">
                            <h5>Account</h5>
                            <button className="share-btn" > Delete user </button>
                            <p>Email settings: sdfsdfsdf</p>
                            <p>Email settings</p>
                            <h5>Application</h5>
                            <p>Email settings</p>
                            <p>Email settings</p>
                            <p>Email settings</p>
                        </div>
                    </div>
                    <div className="column" style={{ gap: '10px' }}>
                        <div className="space-between" style={{ marginBottom: '10px' }}>
                            <h4>Profile Information</h4>
                            <div onClick={handleToggleEdit}>
                                {editable ? <SaveIcon onClick={handleSave} /> : <ModeEditIcon />}
                            </div>
                        </div>
                        <div>
                            <div>
                                <p><strong>Full Name:</strong></p>
                                {editable ? <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} /> : formData.fullName}
                            </div>
                            <div>
                                <p><strong>Email:</strong></p>
                                {editable ? <input type="email" name="email" value={formData.email} onChange={handleChange} /> : formData.email}
                            </div>
                            <div>
                                <p><strong>Location:</strong></p>
                                {editable ? <input type="text" name="location" value={formData.location} onChange={handleChange} /> : formData.location}
                            </div>
                            <div>
                                <p><strong>Occupation:</strong></p>
                                {editable ? <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} /> : formData.occupation}
                            </div>
                            <div>
                                <p><strong>GitHub:</strong></p>
                                {editable ? <input type="text" name="github" value={formData.github} onChange={handleChange} /> : <a>{formData.github}</a>}
                            </div>
                            {editable &&
                                <div>
                                    <p><strong>Change Profile Picture</strong></p>
                                    <input type="file" name="profilePicture" onChange={handleChange} />
                                </div>
                            }
                        </div>
                    </div>

                </div>
                <div>
                    <h4>Projects</h4>
                    <p>This are my developing projects:</p>
                    <div className="space-between" style={{ flexWrap: 'wrap', gap: '30px' }}>
                        {projects.map(project => (
                            <div key={project._id}>
                                <h5>{project.title}</h5>
                                <img src={`${API_DOMAIN}/${project.image}`} alt="project-image" style={{ width: '300px' }} />
                                <button className="share-btn">
                                    <Link to={`/projects/${project._id}`} style={{ color: 'white' }}>view project</Link>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileBox;