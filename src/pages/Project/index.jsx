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
import { Divider } from '@mui/material';

function Project() {
    const { theme } = useTheme();
    const { user, token } = useAuth();
    const {projectId} = useParams();
    const [project, setProject] = useState();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get(`${API_DOMAIN}/projects/${projectId}`,
                { headers: { Authorization: `Bearer ${token}` } });
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
        <div>
             <Header />
            <div className={`home ${theme}`}>
            <div className={`box ${theme}`} style={{ maxWidth: '1400px' }}>
                <div className='space-between' >
                    <h2>{project.title} by {user.fullName}</h2>
                    <ModeEditIcon />
                </div>
                <Divider />
                <div style={{marginTop:'20px'}}>
               
                <div dangerouslySetInnerHTML={{ __html: project.description }} />
                 <img src={`${API_DOMAIN}/${project.image}`} alt={project.title} style={{width:'800px'}}/>
                 <SyntaxHighlighter
                    language="javascript"
                    style={anOldHope}
                    showLineNumbers={true}
                >
                    {project.codeSnippet}
                </SyntaxHighlighter>
                </div>
            </div>
            </div>
            
        </div>
    );
}

export default Project;