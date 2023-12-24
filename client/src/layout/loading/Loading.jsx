import { Spinner } from '@material-tailwind/react';
import React from 'react';

const Loading = () => {
    return (
        <div className='flex w-full justify-center items-center my-2'>
            <Spinner color="amber" />
        </div>
    );
};

export default Loading;