import React from 'react';
import ListWrapItem from '../common/ListWrapItem';
import ItemImage from '../ItemImage';
import ItemImageSkeleton from '../ItemImageSketeton';

const ListCategory = ({ data = [] }) => {
    const arr = Array(12).fill(null);
    return (
        <ListWrapItem>
            {data.length > 0 ? data.length > 0 && data?.map((item) => (
                <ItemImage key={item._id} data={item} ></ItemImage>
            )) :
                arr.map((item, index) => (
                    <ItemImageSkeleton key={index} ></ItemImageSkeleton>
                ))
            }
        </ListWrapItem>
    );
};

export default ListCategory;