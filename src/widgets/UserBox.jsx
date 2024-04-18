import { useTheme } from "../context/theme";
import { Link } from "react-router-dom"
import { Divider, IconButton } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { useAuth } from '../context/AuthProvider';
import { API_DOMAIN } from "../utils/api-domain";

function UserBox() {
    const { theme } = useTheme();
    const { user } = useAuth();

    return (
        <div className={`box ${theme}`} style={{ height: '600px' }}>
            <div className="inline-left" style={{ gap: 15 }}>
                <div>
                    <img src={`${API_DOMAIN}/${user.profilePicture}`} alt="name" style={{ borderRadius: 40, width: "70px" }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <h4>{`@${user.userName}`}</h4>
                    <h6 style={{ marginTop: '-5px', marginBottom: '5px' }}>{user.fullName}</h6>
                    <p className="roboto-font">0 followers</p>
                    <p className="roboto-font">0 following</p>
                </div>

            </div>
            <Divider />
            <div className="column">
                <div className="inline-left" style={{ gap: '15px', margin: '5px 0px' }}>
                    <LocationOnIcon className={`icon ${theme}`} />
                    <p> {user.location ? user.location : <Link to="/my-profile">add location</Link>}</p>
                </div>
                <div className="inline-left" style={{ gap: '15px' }}>
                    <WorkOutlineOutlinedIcon className={`icon ${theme}`} />
                    <p> {user.occupation ? user.occupation : <Link to="/my-profile">add occupation</Link>}</p>
                </div>
            </div>
            <Divider />
            <div className="column">
                <h4>Latest projects</h4>
                <div className="space-between" style={{ gap: 20 }}>
                    <p>Super project</p>
                    <div className="inline-right" style={{ gap: 10 }}>
                        <div className="inline-right" style={{ gap: 10 }}>
                            <p>1</p>
                            <ThumbUpAltRoundedIcon className={`icon ${theme}`} style={{width:'20px'}}/>
                        </div>
                        <div className="inline-right" style={{ gap: 10 }}>
                            <p>1</p>
                            <ChatBubbleOutlineRoundedIcon className={`icon ${theme}`} style={{width:'20px'}}/>
                        </div>
                    </div>
                </div>
                <div className="space-between" style={{ gap: 25 }} >
                    <p>Second Super project</p>
                    <div className="inline-right" style={{ gap: 10 }}>
                        <div className="inline-right" style={{ gap: 10 }}>
                            <p>1</p>
                            <ThumbUpAltRoundedIcon className={`icon ${theme}`} style={{width:'20px'}} />
                        </div>
                        <div className="inline-right" style={{ gap: 10 }}>
                            <p>1</p>
                            <ChatBubbleOutlineRoundedIcon className={`icon ${theme}`} style={{width:'20px'}} />
                        </div>
                    </div>
                </div>
            </div>
            <Divider />
            <div style={{ margin: '10px 0px' }}>
                <h4>Links</h4>
                <p>github.com/myprofile</p>
                <p>github.com/myprofile</p>
                <p>github.com/myprofile</p>
            </div>
        </div>
    )
}

export default UserBox;