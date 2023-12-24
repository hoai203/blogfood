import React from 'react';
import IconWrap from '../Icon/IconWrap';
import { ArrowNextIcon } from '../Icon';
import { Spinner } from '@material-tailwind/react';

const ButtonComment = ({ isLoading = false }) => {
    return (
        <button disabled={isLoading} type='submit' className='px-3 mx-2 py-3 border-2 border-opacity-60 rounded-full 
        border-primary disabled:opacity-60'>
            <IconWrap className='text-2xl text-primary'>
                {isLoading ? <Spinner color='cyan' /> : <ArrowNextIcon></ArrowNextIcon>}
            </IconWrap>
        </button>
    );
};

export default ButtonComment;