import React from 'react';

const Overlay = ({ onClick = () => { }, show }) => {
    return (
        <div onClick={onClick} className={`fixed cursor-pointer inset-0 bg-black bg-opacity-20 z-[7]  ${show ? '' : 'hidden'}`}></div>
    );
};

export default Overlay;