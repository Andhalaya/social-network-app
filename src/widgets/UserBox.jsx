import { useTheme } from "../context/theme";
import { Link } from "react-router-dom"
import { Divider, IconButton } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { useAuth } from '../context/AuthProvider';
import { API_DOMAIN } from "../utils/api-domain";
import AnimatedBox from "../components/Box";

function UserBox() {
    const { theme } = useTheme();
    const { user } = useAuth();

    return (
        <div className="user">
            <AnimatedBox >
                <div className="inline-left gap">
                    <div>
                        <img src={`${API_DOMAIN}/${user.profilePicture}`} alt="name" style={{ borderRadius: 40, width: "70px" }} />
                    </div>
                    <div >
                        <h4>{`@${user.userName}`}</h4>
                        <h6 >{user.fullName}</h6>
                        <div className="margin-top margin-bottom">
                          <p className="roboto-font blue">0 followers</p>
                            <p className="roboto-font blue">0 following</p>  
                        </div>
                        
                    </div>

                </div>
                <Divider />
                <div className="margin-bottom margin-top">
                    <div className="inline-left gap">
                        <LocationOnIcon className={`icon ${theme}`} />
                        <p> {user.location ? user.location : <Link to="/my-profile">add location</Link>}</p>
                    </div>
                    <div className="inline-left gap">
                        <WorkOutlineOutlinedIcon className={`icon ${theme}`} />
                        <p> {user.occupation ? user.occupation : <Link to="/my-profile">add occupation</Link>}</p>
                    </div>
                </div>
                <Divider />
                <div className="margin-bottom margin-top">
                    <h4>Latest projects</h4>
                    <div className="space-between">
                        <p>Super project</p>
                        <div className="inline-left gap">
                            <div className="inline-left gap">
                                <p>1</p>
                                <ThumbUpAltRoundedIcon className={`icon ${theme}`} style={{ width: '20px' }} />
                            </div>
                            <div className="inline-left gap">
                                <p>1</p>
                                <ChatBubbleOutlineRoundedIcon className={`icon ${theme}`} style={{ width: '20px' }} />
                            </div>
                        </div>
                    </div>
                    <div  className="space-between">
                        <p>Second Super project</p>
                        <div className="inline-left gap">
                            <div className="inline-left gap">
                                <p>1</p>
                                <ThumbUpAltRoundedIcon className={`icon ${theme}`} style={{ width: '20px' }} />
                            </div>
                            <div className="inline-left gap">
                                <p>1</p>
                                <ChatBubbleOutlineRoundedIcon className={`icon ${theme}`} style={{ width: '20px' }} />
                            </div>
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="margin-bottom margin-top column gap">
                    <h4>Links</h4>
                    <p>github.com/myprofile</p>
                    <p>github.com/myprofile</p>
                    <p>github.com/myprofile</p>
                </div>
            </AnimatedBox>
        </div>

    )
}

export default UserBox;