
import { useState } from 'react';

const CustomModal = ({ trigger, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            {trigger(openModal)} 
            {isOpen && (
                <div>
                    <div>
                        {children(closeModal)} 
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomModal;
