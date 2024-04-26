import { useTheme } from "../context/theme";
import { Divider } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Post from "../components/Post";
import PostBox from "./PostBox";
import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import { API_DOMAIN } from "../utils/api-domain";
import AnimatedBox from "../components/Box";

function FeedBox() {
    const { theme } = useTheme();
    const { token } = useAuth();
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredPosts = posts.filter(post => {
        const searchableContent = post.title + post.description;
        return searchableContent.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const updatePostLikes = (postId, updatedLikes) => {
        setPosts(posts.map(post => post._id === postId ? { ...post, likes: updatedLikes } : post));
    };

    return (
        <div className="feed">
            <PostBox fetchPosts={fetchPosts} />
            <div style={{display:'flex', justifyContent:'space-between', padding:'35px 30px 5px 30px'}}>
                    <div className="inline-left gap">
                        <p className="white">Friends</p>
                        <p className="white">All users</p>
                        <p className="white">Most recent</p>
                        <p className="white">Oldest</p>
                    </div>
                <div className="">
                    {/* <input type="text" placeholder="search post" value={searchQuery} onChange={handleSearchChange} /> */}
                    <SearchIcon className={`icon ${theme}`} style={{ width: '20px' }} />
                </div>

            </div>
            
                <div style={{ display: 'flex', gap:'20px', flexDirection: 'column-reverse' }}>
                    {filteredPosts.map(post => (
                        <AnimatedBox >
                        <Post key={post._id} post={post} updatePostLikes={updatePostLikes} />
                        </AnimatedBox>
                    ))}
                </div>
            
        </div>
    )
}

export default FeedBox;
