import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_DOMAIN } from '../../utils/api-domain';
import Header from "../../components/Header";
import { useTheme } from "../../context/theme";
import { useAuth } from '../../context/AuthProvider';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import './project.css'
import moment from 'moment';
import * as Icons from "../../utils/Icons";

function Project() {
    const { theme } = useTheme();
    const { token } = useAuth();
    const { projectId } = useParams();
    const [project, setProject] = useState();

    function calculateTimeAgo(timestamp) {
        return moment(timestamp).format(" dddd D MMMM YYYY");
    }

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
                    <img src={`${API_DOMAIN}/public/${project.image}`} alt={project.title} style={{ width: '100%' }} />
                    <div className={`box ${theme}`} >
                        <div style={{ marginBottom: '20px' }}>
                            <p className='label'>Published by:</p>
                            <p className='label-content'>{project.user.fullName}</p>
                        </div>
                        <div>
                            <p className='label'>Github repository:</p>
                            <p className='label-content'><a href={project.link} target='_blank' >{project.link}</a></p>
                        </div>
                    </div>
                    <div className={`box ${theme}`}>
                        <p className='inder h4'>Comments</p>
                        <div className='comment-container'>
                            <div className='comment'>
                                <div className='inline-left gap'>
                                    <img src={`${API_DOMAIN}/public/uploads/default.jpg`} alt="" style={{ width: '40px', borderRadius: '30px' }} />
                                    <p>Guest User</p>
                                </div>
                                <div className='comment-content'>
                                    Looks good!
                                </div>
                            </div>

                        </div>
                        <div className='comment-input'>
                            <input type="text" />
                            <div className='send-btn'>comment</div>
                        </div>
                    </div>
                </div>
                <div className="right-column">
                    <div className='inline-left gap '>
                        <img src={`${API_DOMAIN}/public/uploads/default.jpg`} alt="" style={{ width: '40px', borderRadius: '30px' }} />
                        <h1 className='project-title'>{project.title}</h1>
                        <Icons.FiEdit2 className={`icon ${theme}`} />
                    </div>
                    <div style={{ marginLeft: '50px', fontSize: '13px', marginBottom: '40px' }}>
                        <em>{calculateTimeAgo(project.createdAt)}</em>
                    </div>
                    <div className='inline-left gap'>{project.tags.map((tag, index) => (
                        <div className={`tag ${theme}`} key={index}>#{tag}</div>))}
                    </div>
                    <div style={{ marginTop: '20px' }}>
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
