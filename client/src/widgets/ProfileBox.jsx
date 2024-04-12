import { useTheme } from "../context/theme";
import { useAuth } from '../context/AuthProvider';
import { Divider } from "@mui/material";

function ProfileBox() {
    const { theme } = useTheme();
    const { user } = useAuth();

    return (
        <div>
            <div className='profile-background'>
                <img src="src\assets\1517636940967.jpeg" alt="" />
            </div>
            <div className={`box ${theme} profile`} >
                <div className="space-between">
                    <div className="inline-left" style={{gap:'5px'}}>
                        <img src={user.profilePicture} alt="name" style={{ borderRadius: 40, width: "70px" }} />
                        <div>
                            <h4>{`@${user.userName}`}</h4>
                            <h6>{user.fullName}</h6>
                        </div>    
                    </div>
                    <p>0 followers</p>
                    <p>0 following</p>
                </div>
                <div className="space-between" style={{flexWrap:'wrap'}}>
                    <div>
                        <h4>Settings</h4>
                        <div className="column">
                            <h5>Account</h5>
                            <button className="share-btn" > Delete user </button>
                            <p>Email settings: sdfsdfsdf</p>
                            <p>Email settings</p>
                            <h5>Application</h5>
                            <p>Email settings</p>
                            <p>Email settings</p>
                            <p>Email settings</p>
                        </div>
                    </div>
                    <div>
                        <h4>Profile Information</h4>
                        <p style={{maxWidth:'600px'}}>Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).</p>
                        <h5>Full Name: </h5>{user.fullName}
                        <h5>Email: </h5>{user.email}
                        <h5>Location: </h5>{user.location}
                        <h5>Occupation: </h5>{user.location}
                        <h5>GitHub: </h5>
                    </div>

                </div>
                <div>
                    <h4>Projects</h4>
                    <p>This are my developing projects:</p>
                    <div className="space-between" style={{flexWrap:'wrap', gap: '30px'}}>
                        <div>
                            <img src="" alt="" />
                            <h5>Modern</h5>
                            <p>As Uber works through a huge amount of internal management turmoil.</p>
                            <button className="share-btn">View project</button>
                        </div>
                        <div>
                            <img src="" alt="" />
                            <h5>Modern</h5>
                            <p>As Uber works through a huge amount of internal management turmoil.</p>
                            <button className="share-btn">View project</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ProfileBox;