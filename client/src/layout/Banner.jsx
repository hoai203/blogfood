import React from 'react';

const Banner = () => {
    return (
        <div className='w-full h-full relative bg-cover bg-center bg-fixed  max-h-[500px] overflow-hidden flex justify-center items-center py-44 md:py-72'
            style={{ backgroundImage: `url('./src/assets/image/banner-home.jpg')` }}
        >
            <div className='absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center'>
                <div className='flex flex-col items-center text-white gap-y-5 md:gap-y-10  '>
                    <h1 className='text-2xl md:text-5xl lg:text-8xl font-bold font-logo '>FOODSVIET</h1>
                    <p className='text-xl md:text-3xl lg:text-6xl'
                        style={{ fontFamily: `Dancing Script, cursive` }}>
                        Ẩm Thực Việt - Trải Nghiệm Việt</p>
                    <span className='text-xs md:text-base lg:text-xl'>@FoodsViet</span>
                </div>
            </div>
            {/* <img src="./src/assets/image/banner-home.jpg" alt="" className='w-full h-full object-cover' /> */}
        </div>
    );
};

export default Banner;