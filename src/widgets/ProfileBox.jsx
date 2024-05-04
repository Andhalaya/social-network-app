import { useTheme } from "../context/theme";
import { useAuth } from '../context/AuthProvider';
import { useEffect, useState } from 'react'
import axios from "axios";
import { API_DOMAIN } from "../utils/api-domain";
import AnimatedBox from "../components/Box";
import * as Icons from "../utils/Icons"

function ProfileBox({ userData }) {

    const { theme } = useTheme();
    const { user } = useAuth();
    const [profileUser, setProfileUser] = useState(user);
    const [editable, setEditable] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);
    const [formData, setFormData] = useState({
        id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        location: user.location,
        occupation: user.occupation,
        gitHub: user.gitHub
    });

    useEffect(() => {
        setProfileUser(userData || user);
    }, [userData, user]);

    useEffect(() => {
        if (profileUser) {
            setProfilePicture(profileUser.profilePicture);
        }
    }, [profileUser]);

    const handleToggleEdit = () => {
        setEditable(prevEditable => !prevEditable);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('id', user._id);
            formDataToSend.append('fullName', formData.fullName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('occupation', formData.occupation);
            formDataToSend.append('gitHub', formData.gitHub);
            if (selectedImage) {
                formDataToSend.append('profilePicture', selectedImage);
            }

            const response = await axios.patch(
                `${API_DOMAIN}/users/profile`,
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setProfilePicture(response.data.profilePicture);
            setEditable(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const fields = [
        { name: 'fullName', label: 'Full Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'location', label: 'Location', type: 'text' },
        { name: 'occupation', label: 'Occupation', type: 'text' },
        { name: 'gitHub', label: 'GitHub', type: 'text', link: true }
    ];

    const fieldData = {
        fullName: profileUser.fullName,
        email: profileUser.email,
        location: profileUser.location,
        occupation: profileUser.occupation,
        gitHub: profileUser.gitHub
    };

    return (
        <AnimatedBox>
            <div className={`profile-box ${theme}`}>
                <div className="user-img">
                    <img
                        src={`${API_DOMAIN}/public${profilePicture ? profilePicture : '/uploads/default.jpg'
                            }`}
                        alt="name"
                        width={'130px'}
                    />
                </div>
                <div className="space-between margin-bottom">
                    <p className={`poppins h4 bold ${theme}`}>
                        @{`${profileUser ? profileUser.userName : ''}`}
                    </p>
                    {profileUser._id === user._id && (
                        <div onClick={handleToggleEdit}>
                            {editable ? (
                                <Icons.FaRegSave
                                    className={`icon ${theme}`}
                                    onClick={handleSave}
                                />
                            ) : (
                                <Icons.FiEdit2 className={`icon ${theme}`} />
                            )}
                        </div>
                    )}

                </div>
                {fields.map(field => (
                    <div style={{ marginBottom: '10px' }} key={field.name}>
                        <p>{field.label}:</p>
                        {profileUser._id === user._id ? (
                            <>
                                {editable && profileUser._id === user._id ? (
                                    <input
                                        className="profile-input"
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                    />
                                ) : field.link ? (
                                    <a
                                        href={formData[field.name]}
                                        className={`typography2 ${theme}`}
                                    >
                                        {formData[field.name]}
                                    </a>
                                ) : (
                                    <p className={`typography2 ${theme}`}>
                                        {formData[field.name]}
                                    </p>
                                )}
                            </>
                        ) : ( <p>{fieldData[field.name]}</p>)}

                    </div>
                ))}
                {editable && (
                    <div>
                        <p>Change Profile Picture</p>
                        <input
                            type="file"
                            name="profilePicture"
                            onChange={e => {
                                setSelectedImage(e.target.files[0]);
                            }}
                        />
                    </div>
                )}


            </div>
        </AnimatedBox>
    );
}

export default ProfileBox;
