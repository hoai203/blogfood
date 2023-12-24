import React from 'react';
import { CSSTransition } from 'react-transition-group'
import Portal from '../portal/Portal';
import './animation.css';
const ModalBase = ({ visible = false, children, onClose }) => {
    return (
        <>
            <CSSTransition in={visible} timeout={250} classNames="zoom" unmountOnExit>
                {(status) => (
                    <Portal onClose={onClose}
                        // containerClassName='flex justify-center items-center fixed inset-0 z-[9999]'
                        // bodyClassName='content relative z-10 transition-all duration-[250ms]'
                        overlayClassName='overlay transition-all duration-[250ms]'
                        overlay={true}
                    >
                        {children}
                    </Portal>
                )}
            </CSSTransition>
        </>
    );
};

export default ModalBase;