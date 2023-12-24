import React, { useState } from 'react';
import PostItem from './PostItem';
import ScrollTrigger from 'react-scroll-trigger';
import PostItemSketeton from './PostItemSketeton';
function ListItem({ data = {}, isSingle }) {
    const [isVisible, setIsVisible] = useState(false);
    const onEnterViewport = () => {
        setIsVisible(true);
    };

    return (
        <ScrollTrigger onEnter={onEnterViewport}>
            <div className={`item h-full ${isVisible ? 'visible' : ''}`}>

            </div>
        </ScrollTrigger>
    );
}
const ListPost = ({ data = [], className = '', message = '', isInfo = false }) => {
    const arr = Array(6).fill(null)
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-5 col-span-2 mx-2 lg:mx-0
        ${className}
        `}>

            {data.length > 0
                ? data?.map((item) => (
                    <PostItem key={item._id} data={item} isSingle isInfo={isInfo} ></PostItem>
                ))
                : data.length < 1 && message
                    ? (<div className='text-center pb-10 col-span-3'>{message}</div>)
                    : arr.map((_item, index) => (<PostItemSketeton key={index}></PostItemSketeton>))
            }
        </div>
    );
};

export default ListPost;