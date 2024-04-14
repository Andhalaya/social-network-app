import { useTheme } from "../context/theme";
import { useAuth } from '../context/AuthProvider';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import { API_DOMAIN } from "../utils/api-domain";

function ProfileBox() {
    const { theme } = useTheme();
    const { token, user } = useAuth();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${API_DOMAIN}/projects`,
                    { headers: { Authorization: `Bearer ${token}` } });
                console.log(res.data)
                setProjects(res.data)
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        }
        fetchProjects();
    }, []);

    return (
        <div>
            <div className='profile-background'>
                <img src="src\assets\1517636940967.jpeg" alt="" />
            </div>
            <div className={`box ${theme} profile`} >
                <div className="space-between">
                    <div className="inline-left" style={{ gap: '5px' }}>
                        <img src={user.profilePicture} alt="name" style={{ borderRadius: 40, width: "70px" }} />
                        <div>
                            <h4>{`@${user.userName}`}</h4>
                            <h6>{user.fullName}</h6>
                        </div>
                    </div>
                    <p>0 followers</p>
                    <p>0 following</p>
                </div>
                <div className="space-between" style={{ flexWrap: 'wrap' }}>
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
                        <p style={{ maxWidth: '600px' }}>Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).</p>
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
                    <div className="space-between" style={{ flexWrap: 'wrap', gap: '30px' }}>
                        {projects.map(project => (
                            <div key={project._id}>
                                <h5>{project.title}</h5>
                                <img src={`${API_DOMAIN}/${project.image}`} alt="project-image" style={{ width: '300px' }}/>
                                <button className="share-btn">
                                    <Link to={`/projects/${project._id}`}>view project</Link>
                                </button>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileBox;