import { useState } from "react";
import axios from "axios";
import { useTheme } from "../context/theme";
import { Divider} from "@mui/material";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';

function PostBox() {
    const { theme } = useTheme();
    const [activeFields, setActiveFields] = useState([]);
    const [formData, setFormData] = useState({
        thought: "",
        description: "",
        image: null,
        codeSnippet: "",
        link: ""
    });

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
            // const response = await axios.post("http://localhost:3023/posts", formData);
            console.log("formdata:", formData);
            
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

    return (
        <div className={`box ${theme}`} style={{ maxWidth: '900px' }}>
            <div className="space-between" style={{ marginBottom: '10px' }}>
                <div className="inline-left" style={{ gap: '20px' }}>
                    <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="name" style={{ borderRadius: 40, width: "40px" }} />
                    <div className="search-box" style={{ height: '35px', width: '500px' }}>
                        <input
                            type="text"
                            placeholder="Write a thought..."
                            value={formData.thought}
                            onChange={(e) => handleChange("thought", e.target.value)}
                        />
                    </div>
                </div>
                <button className="share-btn" onClick={handleFormSubmit}>
                    share
                </button>
            </div>
            <Divider />
            <div className="inline-left" style={{ gap: '20px', marginTop: '10px' }}>
                <div className="inline-left" style={{ gap: '5px' }} onClick={() => handleToggleField("image")}>
                    <AddPhotoAlternateOutlinedIcon />
                    <p>Add image</p>
                </div>
                <div className="inline-left" style={{ gap: '5px' }} onClick={() => handleToggleField("description")}>
                    <FormatAlignLeftOutlinedIcon />
                    <p>Add description</p>
                </div>
                <div className="inline-left" style={{ gap: '5px' }} onClick={() => handleToggleField("codeSnippet")}>
                    <CodeRoundedIcon />
                    <p>Add code snippet</p>
                </div>
                <div className="inline-left" style={{ gap: '5px' }} onClick={() => handleToggleField("link")}>
                    <LinkOutlinedIcon />
                    <p>Add link</p>
                </div>
            </div>
            <div className="column" style={{ gap: '10px', width: '500px' }}>
                {isFieldActive("description") && (
                    <textarea
                        placeholder="Enter description"
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                    />
                )}
                {isFieldActive("image") && (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleChange("image", e.target.files[0])}
                    />
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
