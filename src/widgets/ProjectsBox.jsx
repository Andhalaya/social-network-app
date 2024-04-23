import { useTheme } from "../context/theme";
import { useAuth } from '../context/AuthProvider';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import { API_DOMAIN } from "../utils/api-domain";
import { Divider } from "@mui/material";
import AnimatedBox from "../components/Box";


function ProjectsBox() {
    const { theme } = useTheme();
    const { token, user, setUser } = useAuth();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${API_DOMAIN}/projects`,
                    { headers: { Authorization: `Bearer ${token}` } });
                setProjects(res.data)
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        }
        fetchProjects();
    }, []);
    return (
        <div className={`projects-box `}>
            <AnimatedBox>
                <h4>MY PROJECTS</h4>
                <Divider />
                <div className="project-container">
                    {projects.map(project => (
                        <div className="project" key={project._id}>
                            <h5>{project.title}</h5>

                            <img src={`${API_DOMAIN}/${project.image}`} alt="project-img" className="project-img" />


                            <button className="share-btn">
                                <Link to={`/projects/${project._id}`} style={{ color: 'white' }}>view project</Link>
                            </button>
                        </div>
                    ))}
                </div>
            </AnimatedBox>
        </div>

    )
}

export default ProjectsBox;