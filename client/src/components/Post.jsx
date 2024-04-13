import { useTheme } from "../context/theme";
import { Divider,TextField, Button } from "@mui/material";
import LinkSharpIcon from '@mui/icons-material/LinkSharp';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import moment from 'moment';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useState, useEffect } from "react";
import axios from 'axios'
import { useAuth } from "../context/AuthProvider";

function calculateTimeAgo(timestamp) {
    return moment(timestamp).fromNow();
}

function Post({ post, updatePostLikes }) {
    const { theme } = useTheme();
    const {user, token} = useAuth();
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post.comments || []);
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        
        if (post.likes && user) {
            setLiked(post.likes.includes(user._id));
        }
    }, [post.likes, user]);

    const handleLike = async () => {
        try {
            const response = await axios.patch(`http://localhost:3023/posts/${post._id}/like`, { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const updatedLikes = response.data.likes;

            setLiked(updatedLikes.includes(user._id));
            updatePostLikes(post._id, updatedLikes);
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handleComment = async () => {
        try {
            const response = await axios.patch(`http://localhost:3023/posts/${post._id}/comment`, { userId: user._id, comment }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const updatedComments = response.data.comments;

            setComments(updatedComments);
            setComment('');
        } catch (error) {
            console.error("Error commenting:", error);
        }
    };

    return (
        <div key={post._id} style={{ margin: '10px ' }}>
            <div className="space-between">
                <div className="inline-left" style={{ gap: 10 }}>
                    <img src={post.user.profilePicture} alt={post.user.userName} style={{ borderRadius: 40, width: "40px" }} />
                    <div>
                        <h5>{post.user.fullName}</h5>
                        <h6>{post.user.occupation}</h6>
                    </div>
                </div>
                <p>{calculateTimeAgo(post.createdAt)}</p>
            </div>
            <div style={{ margin: '10px 0px' }}>
                <p>{post.title}</p>
                <p>{post.description}</p>
            </div>

            {post.image && (
                <img src={`http://localhost:3023/${post.image}`} alt="" style={{ width: '600px' }} />
            )}

            {post.codeSnippet && (
                <SyntaxHighlighter
                    language="javascript"
                    style={anOldHope}
                    showLineNumbers={true}
                >
                    {post.codeSnippet}
                </SyntaxHighlighter>
            )}

            <div className='space-between'>
                {post.link && (
                    <div className='inline-left' style={{ gap: '10px'}}>
                        <LinkSharpIcon />
                        <a href={post.link} target="_blank" rel="noopener noreferrer" style={{width:'600px'}}>
                            {post.link}
                        </a>
                    </div>
                )}
                <div className="inline-right" style={{ gap: '15px', marginBottom: '10px', width:'100%' }}>
                    <div className="inline-right" style={{ gap: '10px' }} >
                        <p>{post.likes ? post.likes.length : 0}</p>
                        <div style={{cursor:'pointer', display:'flex', alignItems:'center'}} onClick={handleLike}>
                            {liked ? <ThumbUpAltRoundedIcon className={`icon ${theme}`} style={{width:'20px', color: '#008cff'}}/> : <ThumbUpAltRoundedIcon className={`icon ${theme}`} style={{width:'20px'}}/>}
                        </div>
                    </div>
                    <div className="inline-left" style={{ gap: '10px', cursor:'pointer' }} onClick={() => setShowComments(!showComments)}>
                        <p>{comments.length}</p>
                        <ChatBubbleOutlineRoundedIcon className={`icon ${theme}`} style={{ width: '20px' }} />
                    </div>
                </div>
            </div>
            {showComments && (
                <div style={{backgroundColor:'#EDEDED', padding:'15px', borderRadius:'10px', marginBottom:'10px'}}>
                    <h5>Comments</h5>
                    <Divider/>
                        <div style={{marginTop:'10px'}}>
                            {comments.map((comment, index) => (
                                <div key={index} style={{marginBottom: '10px'}}>
                                    <div className="inline-left" style={{gap:'10px', marginBottom: '5px'}}>
                                        <img src={comment.profilePicture} alt="name" style={{ borderRadius: 40, width: "25px" }} />
                                        <div className="inline-left" style={{gap:'10px'}}>
                                            <p style={{fontWeight:'500'}}>{comment.user}</p>
                                            ({calculateTimeAgo(comment.time)})
                                        </div>  
                                    </div>
                                    
                                    <p style={{marginLeft: '35px'}}>{comment.comment}</p>
                                </div>
                            ))}
                        </div>
                        <div style={{ margin: '10px 0px' }}>
                            <input
                                value={comment}
                                onChange={(e) => setComment(e.target.value)} 
                            ></input>
                            <Button variant="contained" color="primary" onClick={handleComment}>Comentar</Button>
                        </div>
                    <Divider />
                </div>
            )}
            
        </div>
    )
}

export default Post;