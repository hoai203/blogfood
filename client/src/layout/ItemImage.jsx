import React from 'react';
import { Heading } from '../components/heading';
import { Link } from 'react-router-dom';

const ItemImage = ({ data, className = '', isCustomer = false }) => {
    return (
        <Link to={isCustomer ? `/info/${data?.slug}` : `/categories/${data?.slug}`}>
            <div className={`flex flex-col justify-center items-center gap-y-2 ${className}`}>
                <div className={`w-[120px] h-[120px]  md:w-[150px] md:h-[150px] rounded-full overflow-hidden`}>
                    <img lazy-src={data?.image}
                        className='w-full h-full object-cover' />
                </div>
                <Heading className='text-center text-sm md:text-base font-semibold'>
                    {isCustomer ? data?.full_name : data?.title}</Heading>
            </div>
        </Link>
    );
};

export default ItemImage;