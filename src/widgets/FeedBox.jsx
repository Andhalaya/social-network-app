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
    const [showSearchInput, setShowSearchInput] = useState(false);

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
                <div className="inline-left" style={{ gap: '30px' }}>
                    {filters.map(filter => (
                        <p className={`filter ${theme}`}>{filter}</p>
                    ))}
                </div>
                <div style={{display:'flex', cursor:'pointer', gap:'5px'}}>
                    {showSearchInput && (
                        <div className= {`search-post ${theme}`}>
                            <input type="text" placeholder="search post" value={searchQuery} onChange={handleSearchChange} className={`${theme}`} />
                        </div>
                       
                    )}
                    <Icons.IoSearch className={`white ${theme}`} style={{ fontSize: '20px' }} onClick={() => setShowSearchInput(!showSearchInput)} />
                </div>

            </div>

            <div className="posts">
                {filteredPosts.map(post => (
                    <div style={{position:'relative'}}>
                    <AnimatedBox >
                        <Post fetchPosts={fetchPosts} key={post._id} post={post} updatePostLikes={updatePostLikes} />
                    </AnimatedBox>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default FeedBox;
