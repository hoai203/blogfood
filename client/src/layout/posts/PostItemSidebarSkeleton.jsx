import React from 'react';
import { Heading } from '../../components/heading';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const PostItemSidebarSleleton = () => {
    return (
        <div className=' flex gap-5 items-center border rounded-sm shadow-soft pr-2 overflow-hidden'>
            <div className='w-24 h-24 overflow-hidden'>
                <Skeleton className=' w-full h-full !block' />
            </div>
            <div className='flex-1 flex flex-col'>
                <div className='flex-1 w-full h-7 '>
                    <Skeleton className=' w-full h-full  ' />
                </div>
                <div className='flex-1 w-full h-7 '>
                    <Skeleton className=' w-full h-full  ' />
                </div>
                <div className='flex-1 w-full h-7 '>
                    <Skeleton className=' w-full h-full  ' />
                </div>
            </div>
        </div>
    );
};

export default PostItemSidebarSleleton;