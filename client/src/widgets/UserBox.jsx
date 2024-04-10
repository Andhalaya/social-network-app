import { useTheme } from "../context/theme";
import { Divider, IconButton } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { useAuth } from '../context/AuthProvider';

function UserBox () {
    const { theme } = useTheme();
    const { user } = useAuth();
    return (
        <div className={`box ${theme}`} style={{height:'600px'}}>
            <div className="inline-left" style={{gap: 15}}>
                <div>
                    <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="name"  style={{borderRadius:40, width:"70px"}}/>
                </div>
                <div>
                    <h4>{`@${user.userName}`}</h4>
                    <h6>{user.fullName}</h6>
                    <p>0 followers</p>
                    <p>0 following</p> 
                </div>
                
            </div>
            <Divider />
            <div className="column">
                <div className="inline-left">
                    <LocationOnIcon className={`icon ${theme}`}/>
                    <p>Somewhere out there, CA</p>
                </div>
                <div className="inline-left"> 
                    <WorkOutlineOutlinedIcon className={`icon ${theme}`}/>
                    <p>Somewhere out there, CA</p> 
                </div>
            </div>
            <Divider />
            <div className="column">
                <h4>Latest projects</h4>
                <div className="space-between">
                    <p>Super project</p>
                    <div className="inline-right">
                        <div className="inline-right">
                            <p>1</p>
                            <div style={{display:'flex'}}>
                                <IconButton>
                                    <ThumbUpAltRoundedIcon className={`icon ${theme}`}/>
                                </IconButton>  
                            </div>
                        </div>
                        <div className="inline-right">
                            <p>1</p>
                            <div style={{display:'flex'}}>
                                <IconButton>
                                    <ChatBubbleOutlineRoundedIcon className={`icon ${theme}`}/>
                                </IconButton>  
                            </div>
                        </div>
                    </div>     
                </div>
                <div className="inline-right">
                    <p>Second Super project</p>
                    <div className="inline-right">
                        <p>1</p>
                        <div style={{display:'flex'}}>
                            <IconButton>
                                <ThumbUpAltRoundedIcon className={`icon ${theme}`}/>
                            </IconButton>  
                        </div>
                    </div>
                    <div className="inline-right">
                        <p>1</p>
                        <IconButton>
                            <ChatBubbleOutlineRoundedIcon className={`icon ${theme}`}/>
                        </IconButton>  
                       
                    </div>  
                </div>
            </div>
            <Divider />
            <div>
                <h4>Links</h4>
                <p>github.com/myprofile</p>
                <p>github.com/myprofile</p>
                <p>github.com/myprofile</p>
            </div>
        </div>
    )
}

export default UserBox;