import { useTheme } from "../context/theme";
import { IconButton, Divider } from "@mui/material";
import LinkSharpIcon from '@mui/icons-material/LinkSharp';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import moment from 'moment';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function calculateTimeAgo(timestamp) {
    return moment(timestamp).fromNow();
}

function Post({ post }) {
    const { theme } = useTheme();

    return (
        <div key={post._id} style={{ margin: '10px 15px' }}>
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={`src/assets/${post.picturePath}`} alt="" style={{ width: '800px' }} />
            </div>
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
                    <div className='inline-left'>
                        <LinkSharpIcon />
                        <a href={post.link} target="_blank" rel="noopener noreferrer">
                            {post.link}
                        </a>
                    </div>
                )}
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
            <Divider />
        </div>

    )
}

export default Post;