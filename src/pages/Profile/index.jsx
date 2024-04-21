import Header from "../../components/Header";
import { useTheme } from "../../context/theme";
import ProfileBox from "../../widgets/ProfileBox";
import FriendsBox from "../../widgets/FriendsBox"
import Post from '../../components/Post'
import ProjectsBox from "../../widgets/ProjectsBox";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ModalPopper from "../../components/Modal";
import { useAuth } from '../../context/AuthProvider';
import { useState, useEffect, useRef } from "react";
import { API_DOMAIN } from "../../utils/api-domain";
import axios from 'axios';
import './Profile.css'
import { Divider } from "@mui/material";

function Profile() {
    const { theme } = useTheme();
    const { token, user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState("");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${API_DOMAIN}/posts`,
                { headers: { Authorization: `Bearer ${token}` } })
            setPosts(res.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const updatePostLikes = (postId, updatedLikes) => {
        setPosts(posts.map(post => post._id === postId ? { ...post, likes: updatedLikes } : post));
    };

    const handleBackgroundChange = (background) => {
        setBackgroundImage(background);
      };

    const backgroundOptions = [
        "1517636940967.jpeg",
        "bababab.jpg",
    ];

    const buttonRef = useRef(null);

    return (
        <>
            <Header />
            <div className={`profile ${theme}`}>
                <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <div className="editBack">
                        <ModalPopper button={buttonRef}>
                            <div className="background-options">
                                {backgroundOptions.map((background, index) => (
                                    <img
                                        key={index}
                                        src={background}
                                        alt={`Background ${index + 1}`}
                                        onClick={() => handleBackgroundChange(background)}
                                    />
                                ))}
                            </div>
                        </ModalPopper>
                        <div className="editIcon" ref={buttonRef}>
                            <ModeEditIcon />
                        </div>
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
                        <div className="box box1">
                            <h4>MY POSTS</h4>
                            <Divider />
                            {posts.map(post => (
                                <Post key={post._id} post={post} updatePostLikes={updatePostLikes} />
                            ))}
                        </div>
                        <ProjectsBox />
                    </div>

                </div>

            </div>
        </>

    )
}

export default Profile;
