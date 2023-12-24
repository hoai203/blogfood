import React from 'react';

const Section = ({ children, className = '' }) => {
    return (
        <div className={`mb-10 ${className}`}>
            {children}
        </div>
    );
};

export default Section;