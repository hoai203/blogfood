import React from 'react';
import './loadingPage.css';
const LoadingPage = () => {
    return (
        <div className='bg-white fixed inset-0 flex justify-center items-center'>
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    );
};

export default LoadingPage;