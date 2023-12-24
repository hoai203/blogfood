import React from 'react';

const PageWrap = ({ children }) => {
    return (
        <div className='md:mt-[50px]'>
            {children}
        </div>
    );
};

export default PageWrap;