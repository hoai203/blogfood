import React from 'react';

const IconWrap = ({ children, className = '' }) => {
    return (
        <div className={`flex justify-center items-center gap-x-1 ${className} `}>
            {children}
        </div>
    );
};

export default IconWrap;