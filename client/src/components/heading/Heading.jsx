import React from 'react';

const Heading = ({ children, className = '', isHeading }) => {
    return (
        <h1 className={`font-heading text-2xl ${className} 
            ${isHeading ? 'uppercase' : ''}`}>
            {children}
        </h1>
    );
};

export default Heading;