import React from 'react';
import './loadingRequest.css'
const LoadingRequest = ({ show = false }) => {
    return (
        <div className={`bg-white bg-opacity-70 fixed inset-0 flex justify-center items-center transition-all
        ${show ? "opacity-100 visible z-[99]" : " opacity-0 invisible z-0"}
        `}>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default LoadingRequest;