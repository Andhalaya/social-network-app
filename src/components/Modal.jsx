import { useState } from 'react';
import { motion } from 'framer-motion';

const CustomModal = ({ trigger, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            {trigger(openModal)}
            <motion.div
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={{
                    open: {
                        clipPath: 'inset(0% 0% 0% 0% round 10px)',
                        transition: {
                            type: 'spring',
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05,
                        },
                    },
                    closed: {
                        clipPath: 'inset(10% 50% 90% 50% round 10px)',
                        transition: {
                            type: 'spring',
                            bounce: 0,
                            duration: 0.3,
                        },
                    },
                }}
            >
                {isOpen && (
                    <div>
                        {children(closeModal)}
                    </div>
                )}
            </motion.div>
        </>
    );
};

export default CustomModal;
