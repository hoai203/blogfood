import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types'
function createPortalWrapper() {
    const element = document.createElement('div');
    element.id = 'portal-wrapper'
    return element;
}
const portalWrapperElm = createPortalWrapper();
const Portal = ({
    containerClassName = '',
    overlayClassName = '',
    bodyClassName = '',
    onClose = () => { },
    overlay = true,
    containerStyle = {},
    bodyStyle = {},
    children
}) => {
    useEffect(() => {
        document.body.appendChild(portalWrapperElm);
    }, []);
    const renderContent = (
        <div className={containerClassName}
            style={containerStyle}
        >
            {overlay && (
                <div className={`${overlayClassName} fixed z-[99] cursor-pointer inset-0 bg-black bg-opacity-50`} onClick={onClose}></div>
            )}
            <div className={bodyClassName}
                style={bodyStyle}
            >
                {children}
            </div>
        </div>
    )
    return createPortal(renderContent, portalWrapperElm);
};

Portal.propTypes = {
    containerClassName: PropTypes.string,
    overlayClassName: PropTypes.string,
    bodyClassName: PropTypes.string,
    onClose: PropTypes.func,
    overlay: PropTypes.bool,
    containerStyle: PropTypes.object,
    bodyStyle: PropTypes.object,
    children: PropTypes.node
}

export default Portal;