import React, { useState} from "react";
import axios from "axios";
import { useTheme } from "../context/theme";
import { Divider, IconButton, Snackbar, Menu, MenuItem } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DeleteOutlined } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import { useAuth } from '../context/AuthProvider';
import { API_DOMAIN } from "../utils/api-domain";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function PostBox({ fetchPosts }) {
    const { theme } = useTheme();
    const { user, token } = useAuth();
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [activeFields, setActiveFields] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
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

    const handleFormSubmit = async (url) => {
        
        if (!formData.title && !formData.description && !formData.codeSnippet && !formData.link && !image) {
            setOpenSnackbar(true);
        } else {
            try {
                const formDataToSend = new FormData();
                formDataToSend.append("user", formData.user);
                formDataToSend.append("title", formData.title);
                formDataToSend.append("description", formData.description);
                formDataToSend.append("codeSnippet", formData.codeSnippet);
                formDataToSend.append("link", formData.link);
                formDataToSend.append("image", image);
    
                await axios.post(url, formDataToSend, {
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
        }
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
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

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image', 'code-block'], 
            ['clean']
        ]
    };
    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'link', 'image', 'code-block'
    ];

    return (
        <div className={`box ${theme}`} style={{maxWidth: '900px' }}>
            <div className="space-between" style={{ marginBottom: '10px' }}>
                <div className="inline-left" style={{ gap: '20px' }}>
                    <img src={`${API_DOMAIN}/${user.profilePicture}`} alt="name" style={{ borderRadius: 40, width: "40px" }} />
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
                <div>
                    <button className="share-btn" onClick={(e) => {setAnchorEl(e.currentTarget)}}>
                        share
                        <KeyboardArrowDownIcon /> 
                    </button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => { handleFormSubmit(`${API_DOMAIN}/posts`); handleMenuClose(); }}>Share as Post</MenuItem>
                        <MenuItem onClick={() => { handleFormSubmit(`${API_DOMAIN}/projects`); handleMenuClose(); }}>Share as Project</MenuItem>
                    </Menu>
                </div>
                <Snackbar 
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={(e) => {
                        setOpenSnackbar(false);
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformorigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    message="Please add some content before sharing"
                />
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
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        value={formData.description}
                        onChange={(value) => handleChange("description", value)}
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
