import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useEffect, useRef } from 'react';
import { useController } from 'react-hook-form';
import { Typography } from '../typography';
import { useDispatch } from 'react-redux';
import './style.css'
import { uploadImage } from '../../sagas/posts/request';
import { CustomUploadAdapter } from './plugin';
const Textarea = ({ name, control, value = '', errors }) => {
    const { field } = useController({ name, control, defaultValue: value, rules: { required: true } });
    const dispatch = useDispatch()
    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return new CustomUploadAdapter(loader, uploadImage, dispatch);
        };
    }
    const isErr = !!errors?.[name]
    const editorRef = useRef(null);
    useEffect(() => {
        if (editorRef.current) {
            const editorElement = editorRef.current.querySelector(".ck.ck-editor");
            if (isErr) {
                editorElement?.classList.add('isErr');
            } else {
                editorElement?.classList.remove('isErr');
            }
        }
    }, [isErr]);
    return (
        <div ref={editorRef} className='textarea_custom'>
            <CKEditor
                config={{
                    placeholder: 'Nhập nội dung...',
                    extraPlugins: [uploadPlugin],
                }}
                {...field}
                editor={ClassicEditor}
                data={field.value}
                onBlur={field.onBlur}
                onFocus={() => { }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    field.onChange(data);
                }}
            />
            {isErr ? (
                <Typography error={errors?.[name]} className={' text-xs text-[#E74C3C]'}>
                    {errors?.[name]?.message}</Typography>
            ) : null}
        </div>
    );
};

export default Textarea;