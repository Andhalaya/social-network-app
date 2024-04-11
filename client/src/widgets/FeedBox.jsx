import { useTheme } from "../context/theme";
import { Divider, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Post from "../components/Post";
import PostBox from "./PostBox";
import { useState, useEffect } from "react";
import {useAuth} from '../context/AuthProvider'
import axios from 'axios';

function FeedBox () {
    const { theme } = useTheme();
    const {token} = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts(); 
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get('http://localhost:3023/posts', 
            {headers: { Authorization: `Bearer ${token}`} })
            console.log(res.data)
            setPosts(res.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    return (
        <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
        <PostBox fetchPosts={fetchPosts}/>
        <div className={`box ${theme}`} style={{maxWidth:'900px'}}>
           <div className="space-between" style={{marginBottom:'10px'}}>
                <h3 style={{fontWeight:'400'}}>Posts</h3>
                <div className="search-box">
                    <input type="text" placeholder="search post"/>
                    <IconButton>
                        <SearchIcon className={`icon ${theme}`} style={{width:'20px'}}/>
                    </IconButton>
                </div>
           </div>
           <Divider/>
           <div style={{display:'flex', flexDirection:'column-reverse'}}>
            {posts.map(post => (
                        <Post key={post._id} post={post} />
                    ))}
            </div>
        </div>
        </div>
    )
}

export default FeedBox;