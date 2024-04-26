import { useTheme } from "../context/theme";
import * as Icons from "../utils/Icons";
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

    const filters = ['Friends', 'All users', 'Most recent', 'Oldest']

    return (
        <div className="feed">
            <PostBox fetchPosts={fetchPosts} />
            <div className="filters">
                <div className="inline-left" style={{gap:'30px'}}>
                    {filters.map(filter => (
                        <p className={`tag ${theme}`}>{filter}</p>
                    ))}
                </div>
                <div className="">
                    {/* <input type="text" placeholder="search post" value={searchQuery} onChange={handleSearchChange} /> */}
                    <Icons.IoSearch className={`icon white ${theme}`} />
                </div>

            </div>

            <div className="posts">
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
