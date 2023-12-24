import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const InputSearch = ({ onChange = () => { } }) => {
    return (
        <div className='relative'>
            <input type="text" onChange={onChange}
                className=' w-full py-3 pr-14 bg-transparent outline-none border-b-2 border-b-primary
            placeholder:text-sm text-sm'
                placeholder='search...' />
            <div className='absolute right-5 top-1/2 -translate-y-2/4' onClick={() => { }}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </div>
    );
};

export default InputSearch;