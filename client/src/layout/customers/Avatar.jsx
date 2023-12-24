import React from 'react';

const Avatar = ({ onClick, className = '', image }) => {
    return (
        <div onClick={onClick} className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full cursor-pointer
         border shadow-soft ${className}`}>
            <img className='w-full h-full object-cover rounded-full'
                src={`${image || "../src/assets/image/user.png"}`} alt="" />
        </div>
    );
};

export default Avatar;