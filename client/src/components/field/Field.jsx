import React from 'react';

const Field = ({ children }) => {
    return (
        <div className='flex flex-col gap-y-1'>
            {children}
        </div>
    );
};

export default Field;