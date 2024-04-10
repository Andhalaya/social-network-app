import { useTheme } from "../context/theme";
import { IconButton, Divider } from "@mui/material";
import LinkSharpIcon from '@mui/icons-material/LinkSharp';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import axios from 'axios';
import { useState, useEffect } from "react";
import {useAuth} from '../context/AuthProvider'


function Post() {
    const { theme } = useTheme();
    const {token} = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3023/posts', {headers: {
            Authorization: `Bearer ${token}`}
        })
            .then(res => {
                console.log(res.data)
                setPosts(res.data)
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });

    }, []);

    return (
        <div>
            {posts.map(post => (
                <div key={post._id} style={{ margin: '25px 15px' }}>
                    <div className="space-between">
                        <div className="inline-left" style={{ gap: 10 }}>
                            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="name" style={{ borderRadius: 40, width: "40px" }} />
                            <div>
                                <h5>{post.user.fullName}</h5>
                                <h6>{post.user.occupation}</h6>
                            </div>
                        </div>
                        <p>9 min</p>
                    </div>
                    <div style={{ margin: '10px 0px' }}>
                        <p>{post.title}</p>
                        <p>{post.description}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={`src/assets/${post.picturePath}`} alt="" style={{ width: '800px' }} />

                    </div>
                    <div className='space-between'>
                        <div className='inline-left'>
                            <LinkSharpIcon />
                            <p>{post.link}</p>
                        </div>
                        <div className="inline-right">
                            <div className="inline-right">
                                <p>1</p>
                                <IconButton>
                                    <ThumbUpAltRoundedIcon className={`icon ${theme}`} />
                                </IconButton>
                            </div>
                            <div className="inline-right">
                                <p>1</p>
                                <IconButton>
                                    <ChatBubbleOutlineRoundedIcon className={`icon ${theme}`} />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <Divider/>
                </div>
                
            ))}
        </div>
    )
}

export default Post;