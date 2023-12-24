import React from 'react';

const Label = ({ htmlFor, className = '', children }) => {
    return (
        <label htmlFor={htmlFor} className={`uppercase text-sm text-text-gray cursor-pointer ${className}`}>{children}</label>
    );
};

export default Label;