import { useTheme } from "../context/theme";
import { Divider, Button } from "@mui/material";
import LinkSharpIcon from '@mui/icons-material/LinkSharp';
import moment from 'moment';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useState, useEffect } from "react";
import axios from 'axios';
import * as Icons from "../utils/Icons";
import { useAuth } from "../context/AuthProvider";
import { API_DOMAIN } from "../utils/api-domain";
import CustomQuill from "./Quill";
import CustomModal from "./Modal";
import { useNavigate } from "react-router";

function calculateTimeAgo(timestamp) {
    return moment(timestamp).fromNow();
}

function Post({ post, updatePostLikes, fetchPosts }) {
    const { theme } = useTheme();
    const { user, token } = useAuth();
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post.comments || []);
    const [showComments, setShowComments] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (post.likes && user) {
            setLiked(post.likes.includes(user._id));
        }
    }, [post.likes, user]);

    const handleLike = async () => {
        try {
            const response = await axios.patch(`${API_DOMAIN}/posts/${post._id}/like`, { userId: user._id }, {
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
            const response = await axios.patch(`${API_DOMAIN}/posts/${post._id}/comment`, { userId: user._id, comment }, {
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

    const handleDeletePost = async () => {
        try {
            const userId = post.user._id;
            await axios.delete(`${API_DOMAIN}/posts/${post._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    userId: userId
                }
            });
            fetchPosts();
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    if (!post.user) {
        return <div>Información del usuario no disponible</div>;
    }

    return (
        <div className={`postBox ${theme}`} key={post._id}>
            <div className="space-between">
                <div className="inline-left gap">
                    <img 
                        src={`${API_DOMAIN}/public${post.user.profilePicture ? post.user.profilePicture : '/uploads/default.jpg'}`} 
                        alt={post.user.userName || 'User'} 
                        style={{ borderRadius: 40, width: "40px" }} 
                    />
                    <div>
                        <p
                            style={{ cursor: 'pointer' }}
                            onClick={() => { navigate(`/profile/${post.user._id}`) }}
                            className={`poppins ${theme}`}
                        >
                            {post.user.fullName || 'Nombre desconocido'}
                        </p>
                        <p className={`typography2 ${theme}`}>{post.user.occupation || 'Ocupación desconocida'}</p>
                    </div>
                </div>
                <div className="inline-right gap">
                    <p className={`typography2 ${theme}`}>{calculateTimeAgo(post.createdAt)}</p>
                    {post.user._id === user._id &&
                        <div>
                            <CustomModal trigger={(openModal) => (
                                <div onClick={openModal}>
                                    <Icons.DeleteOutlined className={`icon ${theme}`} />
                                </div>
                            )}>
                                {(closeModal) => (
                                    <div className={`modal-content ${theme}`}>
                                        <p>¿Are you sure you want to delete this post?</p>
                                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                                            <button onClick={() => {
                                                handleDeletePost();
                                                closeModal();
                                            }}>Delete</button>
                                            <button onClick={closeModal}>Cancel</button>
                                        </div>
                                    </div>
                                )}
                            </CustomModal>
                        </div>
                    }
                </div>
            </div>
            <div className={`post-content ${theme}`}>
                <p className="margin-top margin-bottom">{post.title}</p>
                <div dangerouslySetInnerHTML={{ __html: post.description }} className="margin-bottom" />
                {post.image && (
                    <img src={`${API_DOMAIN}/public/${post.image}`} alt="" width={'100%'} className="margin-bottom" />
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
                {post.link && (
                    <div className="inline-left">
                        <LinkSharpIcon />
                        <a href={post.link} target="_blank" rel="noopener noreferrer" style={{ width: '600px' }}>
                            {post.link}
                        </a>
                    </div>
                )}
                {post.tags && (
                    <div className="post-tags">
                        {post.tags.map((tag, index) => (
                            <div className={`tag ${theme}`} key={index}>#{tag}</div>
                        ))}
                    </div>
                )}
                <div className='space-between'>
                    <div className="inline-left gap">
                        <div className="inline-left gap">
                            <p>{post.likes ? post.likes.length : 0}</p>
                            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={handleLike}>
                                {liked ? <Icons.FaThumbsUp className={` thumbsUp ${theme}`} /> : <Icons.GoThumbsup className={`icon ${theme}`} />}
                            </div>
                        </div>
                        <div onClick={() => setShowComments(!showComments)} className="inline-left gap">
                            <p>{comments.length}</p>
                            <Icons.FaRegComment className={`icon ${theme}`} />
                        </div>
                    </div>
                </div>
            </div>
            {showComments && (
                <div className={`comment-section ${theme}`}>
                    <h3 className="title">Comments</h3>
                    <div style={{ marginTop: '10px' }}>
                        {comments.length === 0 ? (
                            <div style={{ width: '100%', textAlign: 'center' }}>
                                <em className={`noComments ${theme}`}>No comments yet</em>
                            </div>
                        ) : (
                            comments.map((comment, index) => (
                                <div key={index} style={{ marginBottom: '10px' }}>
                                    <div className="inline-left" style={{ gap: '10px', marginBottom: '5px' }}>
                                        <img src={`${API_DOMAIN}/public${comment.profilePicture}`} alt="name" style={{ borderRadius: 40, width: "25px" }} />
                                        <div className="inline-left" style={{ gap: '10px' }}>
                                            <p className={`commentUser ${theme}`}>{comment.user}</p>
                                            <p style={{ fontSize: '12px' }}>({calculateTimeAgo(comment.time)})</p>
                                        </div>
                                    </div>
                                    <div className="innerHtml" style={{ marginLeft: '35px' }} dangerouslySetInnerHTML={{ __html: comment.comment }} />
                                </div>
                            ))
                        )}
                    </div>
                    <div>
                        <div className="inline-left gap margin-bottom margin-top">
                            <img src={`${API_DOMAIN}/public/${user.profilePicture}`} alt="name" style={{ borderRadius: 40, width: "25px" }} />
                            <p style={{ fontWeight: '500' }}>{user.fullName}</p>
                        </div>
                        <div style={{ margin: '0px 35px' }}>
                            <CustomQuill
                                value={comment}
                                handleChange={(comment) => setComment(comment)}
                            />
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'right', marginTop: '10px' }}>
                                <Button variant="contained" color="primary" onClick={handleComment}>
                                    <p style={{ marginRight: '10px' }}>Comment</p>
                                    <Icons.IoSend />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Post;
