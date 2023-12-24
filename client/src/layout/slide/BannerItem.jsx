import React from 'react';
import { Heading } from '../../components/heading';

const BannerItem = ({ data }) => {
    return (
        <div className={`relative w-full h-[500px] bg-center bg-cover overflow-hidden max-h-[230px] 
        md:max-h-[400px] lg:max-h-[450px] m-auto md:rounded-3xl`}
            style={{ backgroundImage: `url(${data.image})` }}>
            <div className='absolute h-full w-full bg-gradient-to-r from-black to-[100%] from-[-100%] '>
                <div className=' absolute h-full w-2/3 flex justify-start items-center mx-5  '>
                    <Heading className='text-white bg-gradient-to-r from-black to-[100%] from-[50%] rounded-3xl
                    opacity-80 text-xl p-2
                font-bold lg:text-4xl lg:leading-normal lg:max-w-[800px]'>
                        {data.title}</Heading>
                </div>
            </div>
        </div>
    );
};

export default BannerItem;