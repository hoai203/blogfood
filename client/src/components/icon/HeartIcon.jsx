import React from 'react';

const HeartIcon = ({ isLiked = false }) => {
    return (
        <span className={`flex items-center justify-center ${isLiked ? 'text-red-500' : ''}`}>
            <ion-icon name={`${isLiked ? "heart" : "heart-outline"}`}></ion-icon>
        </span>
    );
};

export default HeartIcon;