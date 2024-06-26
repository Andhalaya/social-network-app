import React, { useState } from "react";
import { useTheme } from "../context/theme";
import axios from "axios";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Dropzone from "react-dropzone";
import { useAuth } from '../context/AuthProvider';
import { API_DOMAIN } from "../utils/api-domain";
import AnimatedBox from "../components/Box";
import * as Icons from "../utils/Icons";
import TagsInput from "../components/TagsInput";
import CustomSnackbar from "../components/SnackBar";
import CustomQuill from "../components/Quill";

function PostBox({ fetchPosts }) {
    const { user, token } = useAuth();
    const { theme } = useTheme();
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [activeFields, setActiveFields] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openOtherSnackbar, setOpenOtherSnackbar] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selected, setSelected] = useState([]);
    const initialState = {
        user: user._id,
        title: "",
        description: "",
        codeSnippet: "",
        link: "",
        tags: []
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
                selected.forEach(tag => formDataToSend.append("tags[]", tag));

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


    return (
        <AnimatedBox >
            <div className="post-input">
                <div style={{ flex: '70%' }}>
                    <div className={`search-box ${theme}`}>
                        <input
                            type="text"
                            placeholder="Write a thought..."
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            className="roboto"
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
                <div style={{ flex: '30%' }}>
                    <button className={`share-btn ${theme}`} onClick={(e) => { setAnchorEl(e.currentTarget) }}>
                        Share
                        <Icons.KeyboardArrowDownIcon />
                    </button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => { handleFormSubmit(`${API_DOMAIN}/posts`); handleMenuClose(); }}>Share as Post</MenuItem>
                        <MenuItem onClick={() => { handleFormSubmit(`${API_DOMAIN}/projects`); handleMenuClose(); setOpenOtherSnackbar(true) }}>Share as Project</MenuItem>
                    </Menu>
                </div>
                <CustomSnackbar openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} message={'Please add some content before sharing'}/>
                <CustomSnackbar 
                openSnackbar={openOtherSnackbar} 
                setOpenSnackbar={setOpenOtherSnackbar} 
                message={<div>✅Project successfully created! <br/>Check it out in your profile</div>}/>
            </div>
            <div className="inline-left" style={{ gap: '20px', marginTop: '10px', marginLeft: '15px' }}>
                <div className="post-elements medium" onClick={() => handleToggleField("image")}>
                    <div><Icons.IoImageOutline className={`icon ${theme}`} style={{ fontSize: '30px' }} /></div>
                    <p>Add image</p>
                </div>
                <div className="post-elements big" onClick={() => handleToggleField("description")}>
                    <div><Icons.FaAlignJustify className={`icon ${theme}`} /></div>
                    <p>Add description</p>
                </div>
                <div className="post-elements big" onClick={() => handleToggleField("codeSnippet")}>
                    <div><Icons.BiCodeBlock className={`icon ${theme}`} style={{ fontSize: '30px' }} /></div>
                    <p>Add code snippet</p>
                </div>
                <div className="post-elements" onClick={() => handleToggleField("link")}>
                    <div><Icons.FaLink className={`icon ${theme}`} /></div>
                    <p>Add link</p>
                </div>
                <div className="post-elements" onClick={() => handleToggleField("tags")}>
                    <div><Icons.IoPricetagsOutline className={`icon ${theme}`} /></div>
                    <p>Add tags</p>
                </div>
            </div>
            <div style={{ gap: '20px' }} className="column">
                {isFieldActive("image") && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={handleImageChange}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()} >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <div className="dropzone">
                                            <Icons.FiUpload className={`icon ${theme}`} />
                                            <p>Add Image Here</p>
                                        </div>

                                    ) : (
                                        <div className="column">
                                            {imageURL && <img src={imageURL} alt="Preview" width='400px' />}
                                            <div className="inline-left">
                                                <p>{image.name}</p>
                                                <IconButton onClick={() => { setImage(null); setImageURL(null); }}>
                                                    <Icons.DeleteOutlined className={`icon ${theme}`} />
                                                </IconButton>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Dropzone>
                    </div>
                )}
                {isFieldActive("description") && (
                    <CustomQuill
                        value={formData.description}
                        handleChange={(value) => handleChange("description", value)}
                    />
                )}
                {isFieldActive("codeSnippet") && (
                    <textarea
                        className="active-input"
                        placeholder="Enter code snippet"
                        value={formData.codeSnippet}
                        onChange={(e) => handleChange("codeSnippet", e.target.value)}
                    />
                )}
                {isFieldActive("link") && (
                    <input
                        className="active-input"
                        type="url"
                        placeholder="Enter link URL"
                        value={formData.link}
                        onChange={(e) => handleChange("link", e.target.value)}
                    />
                )}
                {isFieldActive("tags") && (
                    <div>
                        <TagsInput
                            value={selected}
                            onChange={setSelected}
                            name="tags"
                            placeholder="press enter to add tag"

                        />
                    </div>
                )}
            </div>
        </AnimatedBox>
    );
}

export default PostBox;
