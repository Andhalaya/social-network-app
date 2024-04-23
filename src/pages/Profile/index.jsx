import Header from "../../components/Header";
import { useTheme } from "../../context/theme";
import ProfileBox from "../../widgets/ProfileBox";
import FriendsBox from "../../widgets/FriendsBox";
import Post from "../../components/Post";
import ProjectsBox from "../../widgets/ProjectsBox";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ModalPopper from '../../components/Modal';
import { useState, useEffect } from "react";
import { API_DOMAIN } from "../../utils/api-domain";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import "./Profile.css";
import { Divider } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

function Profile() {
    const { theme } = useTheme();
    const { token, user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState("src/assets/background1.jpeg");
    const [isEditing, setIsEditing] = useState(false);
    const backgroundOptions = [
        "src/assets/background1.jpeg",
        "src/assets/background2.jpg"

    ];

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${API_DOMAIN}/posts`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts(res.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const updatePostLikes = (postId, updatedLikes) => {
        setPosts(
            posts.map((post) =>
                post._id === postId ? { ...post, likes: updatedLikes } : post
            )
        );
    };

    const handleSaveBackground = async (background) => {
        try {
            
            const res = await axios.patch(`${API_DOMAIN}/${user.id}/updateCover`, { profileCover: background }, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setBackgroundImage(background);
            setIsEditing(false); 
            console.log(res)
          } catch (error) {
            console.error("Error updating background:", error);
          }
        
    };

    return (
        <>
            <Header />
            <div className={`profile ${theme}`}>
                <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <div className="editBack">
                        <ModalPopper
                            trigger={(handleClick) => (
                                <button aria-describedby="transition-popper" type="button" onClick={handleClick}>
                                    {isEditing ? <SaveIcon onClick={handleSaveBackground} /> : <ModeEditIcon />}
                                </button>
                            )}
                        >
                            {(handleClose) => (
                                <div className="background-options">
                                    <button onClick={handleClose}>X</button>
                                    {backgroundOptions.map((background, index) => (
                                        <div className="backgroundImg-container" key={index}>
                                            <img
                                                src={background}
                                                alt={`Background ${index + 1}`}
                                                onClick={() => {
                                                    handleClose(); 
                                                    handleSaveBackground(background);
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ModalPopper>
                    </div>
                </div>
                <div className="profile-container">
                    <div className="info-container">
                        <div className="user-img">
                            <img src={`${API_DOMAIN}/${user.profilePicture}`} alt="name" />
                        </div>
                        <ProfileBox />
                        <FriendsBox />
                    </div>
                    <div className="side-container">
                        <div className={`box ${theme} box1`}>
                            <h4>MY POSTS</h4>
                            <Divider />
                            <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                                {posts.map((post) => (
                                    <Post key={post._id} post={post} updatePostLikes={updatePostLikes} />
                                ))}
                            </div>

                        </div>
                        <ProjectsBox />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
