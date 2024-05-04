import Header from "../../components/Header";
import { useTheme } from "../../context/theme";
import { useState, useEffect, Suspense, lazy } from "react";
import { API_DOMAIN } from "../../utils/api-domain";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import { useParams } from 'react-router-dom';
import "./Profile.css";
import AnimatedBox from "../../components/Box";
import CustomModal from "../../components/Modal";
import SpinningIcon from "../../components/SpinningIcon";
import CoverOptions from "./CoverOptions"

const ProfileBox = lazy(() => import("../../widgets/ProfileBox"));
const Post = lazy(() => import("../../components/Post"));
const FriendsBox = lazy(() => import("../../widgets/FriendsBox"));
const ProjectsBox = lazy(() => import("../../widgets/ProjectsBox"))

function Profile() {
    const { theme } = useTheme();
    const { token, user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState(null);
    const { userId } = useParams();
    const [backgroundImage, setBackgroundImage] = useState(user.profileCover);
    const [isEditingCover, setIsEditingCover] = useState(false);


    useEffect(() => {
        if (userId) {
            fetchUserData();
            fetchPosts();
        } else {
            setUserData(user);
            setBackgroundImage(user.profileCover);
            fetchPosts();
        }
    }, [userId, user]);

    const fetchUserData = async () => {
        try {
            const res = await axios.get(`${API_DOMAIN}/users/${userId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                });
            setUserData(res.data);
            setBackgroundImage(res.data.profileCover);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${API_DOMAIN}/posts`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            let filteredPosts;
            if (userData && userData._id) {
                filteredPosts = res.data.filter(post => post.user._id === userData._id);
            } else {
                filteredPosts = res.data.filter(post => post.user._id === user._id);
            }
            setPosts(filteredPosts);
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
                <div className="background" style={{ backgroundImage: `url(${API_DOMAIN}${backgroundImage ? backgroundImage : '/public/backgrounds/background5.jpg'})`, textAlign: 'right' }}>
                    {userId === undefined && (
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
                                <CoverOptions
                                    closeModal={closeModal}
                                    setIsEditingCover={setIsEditingCover}
                                    handleSaveBackground={handleSaveBackground}
                                />
                            )}
                        </CustomModal>
                    )
                    }
                </div>
                <div className="profile-container">
                    <div className="info-container">
                        <Suspense fallback={<div className={`loadingBox1 box ${theme}`}>Loading...<SpinningIcon /></div>}>
                            <ProfileBox userData={userData} />
                        </Suspense>
                        <Suspense fallback={<div className={`loadingBox1 box ${theme}`}>Loading...<SpinningIcon /></div>}>
                            <FriendsBox userData={userData} type="profile" />
                        </Suspense>
                    </div>
                    <div className="side-container">
                        <div className='box1'>
                            <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '20px' }}>
                                {posts ? posts.map((post) => (
                                    <Suspense key={post._id} fallback={<div className={`box ${theme}`}>Loading...<SpinningIcon /></div>}>
                                        <AnimatedBox >
                                            <Post post={post} updatePostLikes={updatePostLikes} />
                                        </AnimatedBox>
                                    </Suspense>
                                )) : <div style={{widht:'100%', textAlign:'center'}}><em>No posts yet</em></div>}
                            </div>
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
