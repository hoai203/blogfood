import React, { useEffect, useState } from 'react';
import SlideWrap from './SlideWrap';
import BannerItem from './BannerItem';
import { useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';

const Banner = () => {
    const { posts } = useSelector((state) => state.posts)
    const [dataPosts, setDataPosts] = useState([]);

    useEffect(() => {
        setDataPosts(posts)
    }, [posts]);
    return (
        <>
            <SlideWrap isBanner>
                {
                    dataPosts?.slice(0, 5)?.map(item => (
                        <SwiperSlide key={item._id}>
                            <BannerItem data={item}></BannerItem>
                        </SwiperSlide>
                    ))
                }
            </SlideWrap>
        </>
    );
};

export default Banner;