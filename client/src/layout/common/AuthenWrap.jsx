import React from 'react';
import Overlay from './Overlay';
import { Heading } from '../../components/heading';
const AuthenWrap = ({ children, isSignIn = false, heading }) => {
    return (
        <div className='overflow-x-hidden'>
            <div className={`${isSignIn ? 'bg-theme-signin bg-right' : 'bg-theme-signup  bg-left'} relative bg-cover w-full h-full min-h-screen`}>
                <Overlay show={true}></Overlay>
                <div className='relative pt-3 z-[19] flex justify-center items-center flex-col'>
                    <Heading className=' text-center font-black mb-2 text-5xl text-white inline-block m-auto'>
                        {heading}</Heading>
                    <span className='text-center block text-white text-xs '>Chào mừng bạn đến FoodsViet Blog!</span>
                </div>
                <div className={`absolute w-[800px] pb-20 object-cover bottom-0 left-1/2 -translate-x-2/4 
                    rounded-tl-full rounded-tr-full 
                    bg-opacity-50 bg-white bg-[length:900px_900px] z-20 pt-28 px-10
                    md:w-[70%] md:h-min md:rounded-3xl md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-2/4
                    md:px-16 md:py-10
                    lg:w-[45%]  lg:px-10 lg:py-10 
                    ${isSignIn ? "lg:left-1/2 lg:-translate-x-2/4 " : "lg:left-1/2 lg:-translate-x-2/4"}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthenWrap;