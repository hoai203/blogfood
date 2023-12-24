import React from 'react';
import PostItem from './PostItem'
import ListPostsSidebar from './ListPostsSidebar';
import PostItemSketeton from './PostItemSketeton';

const ListPostHome = ({ data = [] }) => {
    const arr = Array(5).fill(null)
    return (
        <div className='grid grid-cols-1 mx-2 md:grid-cols-3  md:mx-0 lg:grid-cols-3 gap-y-10 md:gap-x-6'>
            <div className='grid grid-cols-2 md:grid-cols-2 gap- md:col-span-3 lg:grid-cols-2 gap-y-'>
                {data.length > 0 ? data?.slice(0, 4)?.map(item => (
                    <PostItem key={item._id} data={item}></PostItem>
                )) : arr.map((item, index) => (
                    <PostItemSketeton key={index}></PostItemSketeton>
                ))
                }
            </div>
            <ListPostsSidebar className='page-content ' data={data.length > 0 ? data.slice(4, 10) : []}></ListPostsSidebar>
        </div>
    );
};

export default ListPostHome;