import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { useSelector } from 'react-redux';
import BannerItem from './BannerItem';
import BannerSkeleton from './BannerSketeton';

const SlideSwiper = ({ dataPost }) => {
    const { posts } = useSelector((state) => state.posts)
    const [dataPosts, setDataPosts] = useState([]);
    const arr = Array(6).fill(null);
    useEffect(() => {
        setDataPosts(posts)
    }, [posts]);
    return (
        <section className=' slider my- mb-20 select-none'>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                initialSlide={1}
                centeredSlides={true}
                slidesPerView={1}
                speed={1500}
                coverflowEffect={{
                    rotate: 10,
                    stretch: 100,
                    depth: 0,
                    modifier: 1,
                    slideShadows: true,
                }}
                breakpoints={
                    {
                        0: {
                            slidesPerView: 1,
                        },
                        720: {
                            slidesPerView: 1.2,
                        },
                        960: {
                            slidesPerView: 1.2,
                        },
                    }
                }
                // autoplay={{
                //     delay: 2500,
                //     disableOnInteraction: false,
                // }}
                modules={[EffectCoverflow, Autoplay]}
                className="mySwiper">
                {
                    dataPosts.length > 0 ? dataPosts.slice(0, 5).map(item => (
                        <SwiperSlide key={item._id}>
                            <BannerItem data={item}></BannerItem>
                        </SwiperSlide>
                    )) : arr?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <BannerSkeleton></BannerSkeleton>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section >
    );
};

export default SlideSwiper;