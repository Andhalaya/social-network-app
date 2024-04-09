import { useTheme } from "../context/theme";
import { IconButton } from "@mui/material";
import LinkSharpIcon from '@mui/icons-material/LinkSharp';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';

function Post() {
    const { theme } = useTheme();
    return (
        <div style={{ margin: '15px' }}>
            <div className="space-between">
                <div className="inline-left" style={{ gap: 10 }}>
                    <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="name" style={{ borderRadius: 40, width: "40px" }} />
                    <div>
                        <h5>Hannah Stewart</h5>
                        <h6>web developer</h6>
                    </div>
                </div>
                <p>9 min</p>
            </div>
            <div style={{ margin: '10px 0px' }}>
                <p>Knowledge nay estimable questions repulsive daughters boy. Solicitude gay way unaffected expression for. His mistress ladyship required off horrible disposed rejoiced. Unpleasing pianoforte unreserved as oh he unpleasant no inquietude insipidity. Advantages can discretion possession add favourable cultivated admiration far. Why rather assure how esteem end hunted nearer and before. By an truth after heard going early given he. Charmed to it excited females whether at examine. Him abilities suffering may are yet dependent.</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '700px', height: '400px', backgroundColor: 'grey' }}></div>
            </div>
            <div className='space-between'>
                <div className='inline-left'>
                    <LinkSharpIcon />
                    <p>github.com/myprofile</p>
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

        </div>
    )
}

export default Post;