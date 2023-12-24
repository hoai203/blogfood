import React from 'react';
import Breadcrumb from '../Breadcumb';

const BannerCommon = ({ image, title, className = '' }) => {
    return (
        <div className={`w-full h-full relative min-h-[100%] bg-cover bg-center bg-fixed ${className}`}
            style={{ backgroundImage: `url(${image})` }}>
            <div className='absolute inset-0 bg-black bg-opacity-60 flex z-0 justify-center items-center'></div>
            <div className='flex flex-col gap-y-10 items-center text-white z-[10] py-20 md:py-32     lg:py-40 '>
                <h1 className='text-2xl md:text-7xl  font-bold  z-[1]'>{title}</h1>
                <div className='z-[3]'>
                    <Breadcrumb></Breadcrumb>
                </div>
            </div>
        </div>
    );
};

export default BannerCommon;