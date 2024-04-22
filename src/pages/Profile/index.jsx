import Header from "../../components/Header";
import { useTheme } from "../../context/theme";
import ProfileBox from "../../widgets/ProfileBox";
import FriendsBox from "../../widgets/FriendsBox";
import Post from "../../components/Post";
import ProjectsBox from "../../widgets/ProjectsBox";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import { useState, useEffect } from "react";
import { API_DOMAIN } from "../../utils/api-domain";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import "./Profile.css";
import { Divider } from "@mui/material";

function Profile() {
  const { theme } = useTheme();
  const { token, user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleBackgroundChange = (background) => {
    setBackgroundImage(background);
    setOpen(false); 
  };

  const backgroundOptions = [
    "src/assets/background1.jpeg",
    "src/assets/background2.jpg",
    "src/assets/web.jpeg",

    
   
  ];

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Header />
      <div className={`profile ${theme}`}>
      <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="editBack">
            <div>
              <button aria-describedby={open ? "transition-popper" : undefined} type="button" onClick={handleClick}>
                <ModeEditIcon />
              </button>
              <Popper id="transition-popper" open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <div>
                      <div className="background-options">
                        <button onClick={handleClose}>X</button>
                        {backgroundOptions.map((background, index) => (
                         <div className="backgroundImg-container">
                          <img
                            key={index}
                            src={background}
                            alt={`Background ${index + 1}`}
                            onClick={() => handleBackgroundChange(background)}
                          />
                          </div>
                        ))}
                      </div>
                    </div>
                  </Fade>
                )}
              </Popper>
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
              {posts.map((post) => (
                <Post key={post._id} post={post} updatePostLikes={updatePostLikes} />
              ))}
            </div>
            <ProjectsBox />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
