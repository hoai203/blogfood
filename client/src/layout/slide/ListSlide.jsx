import React from 'react';
import SlideWrap from './SlideWrap';
import ItemImage from '../ItemImage';
import { SwiperSlide } from 'swiper/react';
import ItemImageSkeleton from '../ItemImageSketeton';


const ListSlide = ({ data = [], className, isCustomer = false }) => {
    const arr = Array(10).fill(null);
    return (
        <>
            <SlideWrap mobile={3} desktop={6} tablet={4}>
                {
                    data.length > 0 ? data.map((item) => (
                        <SwiperSlide key={item._id}>
                            <ItemImage isCustomer={isCustomer} className={className} data={item}></ItemImage>
                        </SwiperSlide>
                    )) : arr.map((item, index) => (
                        <SwiperSlide key={index}>
                            <ItemImageSkeleton></ItemImageSkeleton>
                        </SwiperSlide>
                    ))
                }
            </SlideWrap>
        </>
    );
};


export default ListSlide;