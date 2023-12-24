import React, { useEffect } from 'react';
import { useController } from "react-hook-form";
import { Input as InputCustom } from "@material-tailwind/react";
import { Typography } from '../typography';
const Input = ({ children, control, placeholder = 'Enter your content', type = 'text', name, value, errors, disable = false }) => {
    const { field } = useController({ name, control, defaultValue: value });
    const isErr = !!errors?.[name]
    return (
        <div>
            <div className='relative'>
                <InputCustom disabled={disable}
                    type={type}
                    variant="standard"
                    label={placeholder}
                    icon={children}
                    color={isErr ? 'red' : 'gray'}
                    className={`${isErr ? '!border-red-500' : ''} disabled:bg-white`}
                    {...field}
                />
                {isErr ? (
                    <Typography error={errors?.[name]} className={' text-xs text-[#E74C3C]'}>
                        {errors?.[name]?.message}</Typography>
                ) : null}
            </div>
        </div>
    );
};

export default Input;