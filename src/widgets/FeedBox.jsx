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
            <AnimatedBox >
                <div className="space-between margin-bottom">
                    <div className="inline-left margin-bottom gap">
                        <p>Filter by:</p>
                        <div className="inline-left gap">
                            <p className="tag">friends</p>
                            <p className="tag">all users</p>
                            <p className="tag">most recent</p>
                            <p className="tag">oldest</p>
                        </div>
                    </div>

                    <div className="search-box">
                        <input type="text" placeholder="search post" value={searchQuery} onChange={handleSearchChange} />
                        <SearchIcon className={`icon ${theme}`} style={{ width: '20px' }} />
                    </div>
                    
                </div>
                <h2>Feed</h2>

                <Divider />
                <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                    {filteredPosts.map(post => (
                        <Post key={post._id} post={post} updatePostLikes={updatePostLikes} />
                    ))}
                </div>
            </AnimatedBox>
        </div>
    )
}

export default FeedBox;
