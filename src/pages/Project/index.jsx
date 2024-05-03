import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_DOMAIN } from '../../utils/api-domain';
import Header from "../../components/Header";
import { useTheme } from "../../context/theme";
import { useAuth } from '../../context/AuthProvider';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import './project.css'

function Project() {
    const { theme } = useTheme();
    const { token } = useAuth();
    const { projectId } = useParams();
    const [project, setProject] = useState();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get(`${API_DOMAIN}/projects/${projectId}`,
                    { headers: { Authorization: `Bearer ${token}` } });
                console.log(res.data)
                setProject(res.data);
            } catch (error) {
                console.error("Error fetching project:", error);
            }
        };
        fetchProject();
    }, [projectId]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            
                <div className={`page-container ${theme}`}>
                    <div className='left-column'>
                        <div className={`box ${theme}`}></div>
                        <div className={`box ${theme}`}></div>
                    </div>
                    <div className="right-column">
                        <div className='space-between' >
                            <h2>{project.title} by {project.user.fullName}</h2>
                            <ModeEditIcon />
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <img src={`${API_DOMAIN}/public/${project.image}`} alt={project.title} style={{ width: '800px' }} />
                            <div className='project-text' dangerouslySetInnerHTML={{ __html: project.description }} />
                            {project.codeSnippet && (
                                <SyntaxHighlighter
                                    language="javascript"
                                    style={anOldHope}
                                    showLineNumbers={true}
                                >
                                    {project.codeSnippet}
                                </SyntaxHighlighter>

                            )}
                        </div>
                    </div>

                </div>
            
        </>
    );
}

export default Project;
