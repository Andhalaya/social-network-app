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
    const { token, user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [filterType, setFilterType] = useState('All users');
    const [selectedFilter, setSelectedFilter] = useState('All users');

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

    const handleFilterChange = (type) => {
        setFilterType(type);
    };

    const filteredPosts = posts.filter(post => {
        const searchableContent = post.title + post.description;
        return searchableContent.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const filteredAndSortedPosts = () => {
        let filtered = filteredPosts;
        if (filterType === 'Friends') {
            const friendsPosts = filtered.filter(post => user.friends.includes(post.user._id));
            filtered = friendsPosts;
        } else if (filterType === 'Most recent') {
            filtered = filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (filterType === 'Oldest') {
            filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        return filtered;
    };

    const updatePostLikes = (postId, updatedLikes) => {
        setPosts(posts.map(post => post._id === postId ? { ...post, likes: updatedLikes } : post));
    };

    return (
        <div className="feed">
            <PostBox fetchPosts={fetchPosts} />
            <div className="filters">
                <div className="inline-left" style={{ gap: '30px' }}>
                    {['All users', 'Friends', 'Most recent', 'Oldest'].map(filter => (
                        <p
                            key={filter}
                            className={`filter ${theme} ${filter === selectedFilter ? 'selected' : ''}`}
                            onClick={() => {
                                handleFilterChange(filter);
                                setSelectedFilter(filter);
                            }}
                        >
                            {filter}
                        </p>
                    ))}
                </div>
                <div style={{ display: 'flex', cursor: 'pointer', gap: '5px' }}>
                    {showSearchInput && (
                        <div className={`search-post ${theme}`}>
                            <input type="text" placeholder="search post" value={searchQuery} onChange={handleSearchChange} className={`${theme}`} />
                        </div>
                    )}
                    <Icons.IoSearch className={`icon white ${theme}`} style={{ fontSize: '20px' }} onClick={() => setShowSearchInput(!showSearchInput)} />
                </div>
            </div>

            <div className="posts">
                {filteredAndSortedPosts().map(post => (
                    <div key={post._id} style={{ position: 'relative' }}>
                        <AnimatedBox>
                            <Post fetchPosts={fetchPosts} post={post} updatePostLikes={updatePostLikes} />
                        </AnimatedBox>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeedBox;
