import Header from "../../components/Header";
import { useTheme } from "../../context/theme";
import { useState, useEffect, Suspense, lazy } from "react";
import { API_DOMAIN } from "../../utils/api-domain";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import "./Profile.css";
import { Divider } from "@mui/material";
import AnimatedBox from "../../components/Box";
import CustomModal from "../../components/Modal";
import SpinningIcon from "../../components/SpinningIcon";

const ProfileBox = lazy(() => import("../../widgets/ProfileBox"));
const Post = lazy(() => import("../../components/Post"));
const FriendsBox = lazy(() => import("../../widgets/FriendsBox"));
const ProjectsBox = lazy(() => import("../../widgets/ProjectsBox"))
const CoverOptions = lazy(() => import("./CoverOptions"));

function Profile() {
    const { theme } = useTheme();
    const { token, user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState(user.profileCover);
    const [isEditingCover, setIsEditingCover] = useState(false);

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
                <div className="background" style={{ backgroundImage: `url(${backgroundImage})`, textAlign: 'right' }}>
                    <CustomModal trigger={(openModal) => (
                        !isEditingCover && (
                            <button className="editCover-btn" type="button" onClick={() => {
                                openModal();
                                setIsEditingCover(true);
                            }}>
                                <p>change cover</p>
                            </button>
                        )
                    )}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <CoverOptions
                                closeModal={closeModal}
                                setIsEditingCover={setIsEditingCover}
                                handleSaveBackground={handleSaveBackground}
                            />
                        </Suspense>
                    </CustomModal>
                </div>
                <div className="profile-container">
                    <div className="info-container">
                        <div className="user-img">
                            <img src={`${API_DOMAIN}/${user.profilePicture}`} alt="name" />
                        </div>
                        <Suspense fallback={<div className="loadingBox1 box">Loading...<SpinningIcon /></div>}>
                            <ProfileBox />
                        </Suspense>
                        <Suspense fallback={<div className="loadingBox1 box">Loading...<SpinningIcon /></div>}>
                            <FriendsBox type="profile" />
                        </Suspense>
                    </div>
                    <div className="side-container">
                        <div className='box1'>
                            <AnimatedBox >
                                <h4>MY POSTS</h4>
                                <Divider />
                                <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                                    {posts.map((post) => (
                                        <Suspense fallback={<div>Loading...<SpinningIcon /></div>}>
                                            <Post key={post._id} post={post} updatePostLikes={updatePostLikes} />
                                        </Suspense>
                                    ))}
                                </div>
                            </AnimatedBox>
                        </div>
                        <Suspense fallback={<div className="loadingBox3">Loading...<SpinningIcon /></div>}>
                            <ProjectsBox />
                        </Suspense>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Profile;
