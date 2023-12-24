import React from 'react';
import { useController } from "react-hook-form";
import { Textarea } from "@material-tailwind/react";
import { Typography } from '../typography';
const InputTextarea = ({ children, control, placeholder = 'Enter your content', type = 'text', name, value, errors, disable = false }) => {
    const { field, setValue } = useController({ name, control, defaultValue: value });
    const isErr = !!errors?.[name]
    return (
        <div>
            <div className='relative'>
                <Textarea disabled={disable}
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

export default InputTextarea;