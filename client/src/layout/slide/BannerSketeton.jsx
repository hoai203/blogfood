import React from 'react';
import Skeleton from 'react-loading-skeleton'

const BannerSkeleton = () => {
    return (
        <>
            <div className={`relative w-full h-[500px] bg-center bg-cover overflow-hidden max-h-[230px]
                md:max-h-[400px] lg:max-h-[450px] m-auto md:rounded-3xl`}>
                <Skeleton className='w-full h-full rounded-3xl bg-blue-gray-500'></Skeleton>
            </div>
        </>
    );
};

export default BannerSkeleton;