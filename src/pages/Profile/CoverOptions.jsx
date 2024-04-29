import { CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_DOMAIN } from '../../utils/api-domain';

const CoverOptions = ({ closeModal, setIsEditingCover, handleSaveBackground }) => {
    const [backgroundOptions, setBackgroundOptions] = useState([]);


    useEffect(() => {
        fetchBackgroundOptions();
    }, []);

    const fetchBackgroundOptions = async () => {
        try {

            const response = await axios.get(`${API_DOMAIN}/covers`);
            console.log(response.data)
            setBackgroundOptions(response.data);
        } catch (error) {
            console.error("Error fetching background options:", error);
        }
    };

    return (
        <div className="editBack">
            <div style={{ display: 'flex', justifyContent: 'right' }}>
                <button
                    className="close-btn"
                    onClick={() => {
                        closeModal();
                        setIsEditingCover(false);
                    }}
                >
                    X
                </button>
            </div>
            <div className="background-options">
                {backgroundOptions.map((background, index) => (
                    <div className="backgroundImg-container" key={index}>
                        <img
                            src={`${API_DOMAIN}${background}`}
                            alt={`Background ${index + 1}`}
                            onClick={() => {
                                closeModal();
                                setIsEditingCover(false);
                                handleSaveBackground(background);
                            }}
                            style={{ maxWidth: '200px' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoverOptions;