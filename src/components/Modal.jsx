
import { useState } from 'react';

const CustomModal = ({ trigger, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            {trigger(openModal)} 
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={closeModal} >&times;</span> 
                        {children(closeModal)} 
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomModal;
