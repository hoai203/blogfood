import React from 'react';

const ListWrapItem = ({ children }) => {
    return (
        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-10 gap-y-14 mx-5'>
            {children}
        </div>
    );
};

export default ListWrapItem;