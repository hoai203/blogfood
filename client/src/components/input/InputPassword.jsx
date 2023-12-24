import React from 'react';
import { EyeOffIcon, EyeOpenIcon } from '../Icon';
import { useController } from 'react-hook-form';
import { Input } from '@material-tailwind/react';
import { Typography } from '../typography';
import useToggle from '../../hooks/useToggle';

const InputPassword = ({ control, placeholder = 'Enter your content', name, value, errors }) => {
    const { toggle: showPassword, handleToggle: handleShowPassword } = useToggle(false);
    const { field } = useController({ name, control, defaultValue: value, rules: { required: true } });
    const isErr = !!errors?.[name]

    return (
        <div>
            <div className='relative'>
                <Input type={showPassword ? 'text' : 'password'} color={isErr ? 'red' : 'gray'} id={name}
                    variant="standard" label={placeholder} {...field}
                    icon={<span className='text-base text-text-gray absolute right-0 top-1/2 -translate-y-2/4 font-thin 
                        cursor-pointer' onClick={handleShowPassword}>
                        {showPassword ? <EyeOpenIcon></EyeOpenIcon> : <EyeOffIcon></EyeOffIcon>} </span>}
                />
            </div>
            {isErr ? (
                <Typography error={errors?.[name]} className={' text-xs text-[#E74C3C]'}>
                    {errors?.[name]?.message}</Typography>
            ) : null}
        </div>
    );
};

export default InputPassword;