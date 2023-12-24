import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const SlideWrap = ({ children, mobile = 1, desktop = 1, tablet = 1, spaceBetween = 0 }) => {

    return (
        <div className='select-none'>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={spaceBetween}
                slidesPerView={mobile}
                navigation
                // autoplay={{
                //     delay: 2500,
                //     disableOnInteraction: false,
                // }}
                breakpoints={{
                    640: {
                        slidesPerView: tablet,
                    },
                    1024: {
                        slidesPerView: desktop,
                    },
                }}
            >
                {children}
            </Swiper>
        </div>
    );
};

export default SlideWrap;