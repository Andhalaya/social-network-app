import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "../context/theme";
import { Divider, IconButton } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { DeleteOutlined } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import { useAuth } from '../context/AuthProvider';

function PostBox({ fetchPosts }) {
    const { theme } = useTheme();
    const { user, token } = useAuth();
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [activeFields, setActiveFields] = useState([]);
    const initialState = {
        user: user._id,
        title: "",
        description: "",
        codeSnippet: "",
        link: ""
    };
    const [formData, setFormData] = useState(initialState);

    const handleToggleField = (fieldName) => {
        if (activeFields.includes(fieldName)) {
            setActiveFields(activeFields.filter(field => field !== fieldName));
        } else {
            setActiveFields([...activeFields, fieldName]);
        }
    };

    const isFieldActive = (fieldName) => {
        return activeFields.includes(fieldName);
    };

    const handleFormSubmit = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("user", formData.user);
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("codeSnippet", formData.codeSnippet);
            formDataToSend.append("link", formData.link);
            formDataToSend.append("image", image);

            await axios.post("http://localhost:3023/posts", formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            fetchPosts();
            setFormData(initialState);
            setImage(null);
            setImageURL(null);
            setActiveFields([]);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value
        });
    };

    const handleImageChange = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setImage(file);

        const reader = new FileReader();
        reader.onload = (e) => setImageURL(e.target.result);
        reader.readAsDataURL(file);
    };

    return (
        <div className={`box ${theme}`} style={{ maxWidth: '900px' }}>
            <div className="space-between" style={{ marginBottom: '10px' }}>
                <div className="inline-left" style={{ gap: '20px' }}>
                    <img src={user.profilePicture} alt="name" style={{ borderRadius: 40, width: "40px" }} />
                    <div className="search-box" style={{ height: '35px', width: '500px' }}>
                        <input
                            type="text"
                            placeholder="Write a thought..."
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            className="roboto-font"
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
                <button className="share-btn" onClick={handleFormSubmit}>
                    share
                </button>
            </div>
            <Divider />
            <div className="inline-left" style={{ gap: '20px', marginTop: '10px' }}>
                <div className="inline-left" style={{ gap: '5px', cursor: 'pointer' }} onClick={() => handleToggleField("image")}>
                    <AddPhotoAlternateOutlinedIcon />
                    <p>Add image</p>
                </div>
                <div className="inline-left" style={{ gap: '5px', cursor: 'pointer' }} onClick={() => handleToggleField("description")}>
                    <FormatAlignLeftOutlinedIcon />
                    <p>Add description</p>
                </div>
                <div className="inline-left" style={{ gap: '5px', cursor: 'pointer' }} onClick={() => handleToggleField("codeSnippet")}>
                    <CodeRoundedIcon />
                    <p>Add code snippet</p>
                </div>
                <div className="inline-left" style={{ gap: '5px', cursor: 'pointer' }} onClick={() => handleToggleField("link")}>
                    <LinkOutlinedIcon />
                    <p>Add link</p>
                </div>
            </div>
            <div className="column" style={{ gap: '10px', width: '100%' }}>
                {isFieldActive("description") && (
                    <textarea
                        placeholder="Enter description"
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                    />
                )}
                {isFieldActive("image") && (
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={handleImageChange}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()} >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p className="dropzone">Add Image Here</p>
                                    ) : (
                                        <div className="column">
                                            {imageURL && <img src={imageURL} alt="Preview" style={{ maxWidth: "600px" }} />}
                                            <div className="inline-left">
                                                <p>{image.name}</p>
                                                <IconButton onClick={() => { setImage(null); setImageURL(null); }}>
                                                    <DeleteOutlined />
                                                </IconButton>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Dropzone>
                    </div>
                )}
                {isFieldActive("codeSnippet") && (
                    <textarea
                        placeholder="Enter code snippet"
                        value={formData.codeSnippet}
                        onChange={(e) => handleChange("codeSnippet", e.target.value)}
                    />
                )}
                {isFieldActive("link") && (
                    <input
                        type="url"
                        placeholder="Enter link URL"
                        value={formData.link}
                        onChange={(e) => handleChange("link", e.target.value)}
                    />
                )}
            </div>
        </div>
    );
}

export default PostBox;
