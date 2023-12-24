import React from 'react';
import ItemImage from '../ItemImage';
import ListWrapItem from '../common/ListWrapItem';
import ItemImageSkeleton from '../ItemImageSketeton';

const ListCustomer = ({ data }) => {
    const arr = Array(12).fill(null);
    return (
        <ListWrapItem>
            {data?.length > 0 ? data?.map((item) => (
                <ItemImage isCustomer key={item._id} data={item} ></ItemImage>
            )) :
                arr.map((item, index) => (
                    <ItemImageSkeleton key={index} ></ItemImageSkeleton>
                ))
            }
        </ListWrapItem>
    );
};

export default ListCustomer;