import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ItemImageSkeleton = () => {
    return (
        <div>
            <div className='flex flex-col justify-center items-center gap-y-2'>
                <div className={`w-[100px] h-[100px]  md:w-[150px] md:h-[150px] rounded-full overflow-hidden`}>
                    <Skeleton className='w-full h-full object-cover !rounded-full' />
                </div>
                <div className='w-2/3 h-6 rounded-sm overflow-hidden'>
                    <Skeleton className='w-full h-full !rounded-sm' />
                </div>
            </div>
        </div>
    );
};

export default ItemImageSkeleton;