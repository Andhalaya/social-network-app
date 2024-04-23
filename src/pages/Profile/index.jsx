import Header from "../../components/Header";
import { useTheme } from "../../context/theme";
import ProfileBox from "../../widgets/ProfileBox";
import FriendsBox from "../../widgets/FriendsBox";
import Post from "../../components/Post";
import ProjectsBox from "../../widgets/ProjectsBox";
import { useState, useEffect, useRef } from "react";
import { API_DOMAIN } from "../../utils/api-domain";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import "./Profile.css";
import { Divider } from "@mui/material";
import CustomModal from "../../components/Modal";


function Profile() {
    const { theme } = useTheme();
    const { token, user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState(user.profileCover);
    const [isEditingCover, setIsEditingCover] = useState(false);
    const backgroundOptions = [
        "src/assets/background1.jpeg",
        "src/assets/background2.jpg",
        "src/assets/background3.jpg",
        "src/assets/background4.jpg",
        "src/assets/background5.jpg"

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

            await axios.patch(`${API_DOMAIN}/users/${user._id}/updateCover`, { profileCover: background }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBackgroundImage(background);
        } catch (error) {
            console.error("Error updating background:", error);
        }

    };

    return (
        <>
            <Header />
            <div className={`profile ${theme}`}>
                <div className="background" style={{ backgroundImage: `url(${backgroundImage})`, textAlign:'right' }}>
                    <CustomModal
                        trigger={(openModal) => (
                            !isEditingCover && (
                                <button className="editCover-btn" type="button" onClick={() => {
                                    openModal();
                                    setIsEditingCover(true);
                                }}>
                                    <p>change cover</p>
                                </button>
                            )
                        )}
                    >
                        {(closeModal) => (
                            <div className="editBack">
                                <div style={{ display: 'flex', justifyContent: 'right' }}>
                                    <button
                                        className="close-btn"
                                        onClick={() => {
                                            closeModal();
                                            setIsEditingCover(false);
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                                <div className="background-options">
                                    {backgroundOptions.map((background, index) => (
                                        <div className="backgroundImg-container" key={index}>
                                            <img
                                                src={background}
                                                alt={`Background ${index + 1}`}
                                                onClick={() => {
                                                    closeModal();
                                                    setIsEditingCover(false);
                                                    handleSaveBackground(background);
                                                }}
                                                style={{ maxWidth: '200px' }}
                                            />
                                        </div>
                                    ))}
                                </div>


                            </div>
                        )}
                    </CustomModal>

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
