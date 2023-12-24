import React from 'react';
import { Select as SelectCustom, Option } from "@material-tailwind/react";
import { useController } from 'react-hook-form';
import { Typography } from '../typography';

const Select = ({ name, control, data = [], value = '', errors, title = '' }) => {
    const { field } = useController({ name, control, defaultValue: value });
    const isErr = !!errors?.[name]
    if (data && data.length > 0) {
        return (
            <>
                <SelectCustom variant="standard" label={title} {...field}
                    className={`${isErr ? '!border-red-500' : ''} disabled:bg-white`}>
                    {data?.length > 0 && data.map((item) => (
                        <Option key={item?._id} value={item?._id}>{item?.title}</Option>
                    ))}
                </SelectCustom>
                {
                    isErr ? (
                        <Typography error={errors?.[name]} className={' text-xs text-[#E74C3C]'}>
                            {errors?.[name]?.message}</Typography>
                    ) : null
                }
            </>
        );
    }
    if (!data && data.length < 1) {
        return (<SelectCustom variant="standard" label="Danh mục"  {...field}>
            <Option>Loading....</Option>
        </SelectCustom>)
    }
};

export default Select;