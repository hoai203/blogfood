import React, { useEffect, useState } from 'react';
import { Heading } from '../components/heading';
import { Field } from '../components/field';
import { Label } from '../components/label';
import { FileInput, Input, InputTextarea } from '../components/input';
import { BookmarkIcon } from '../components/Icon';
import { useForm } from "react-hook-form"
import { Select } from '../components/select';
import { Textarea } from '../components/textarea';
import { Button } from '../components/button';
import { yupResolver } from "@hookform/resolvers/yup"
import { categoriesRequest } from '../sagas/categories/categoriesSlice';
import Section from '../layout/common/Section';
import BannerCommon from '../layout/common/BannerCommon';
import { getDate, getTimestamp } from '../hooks/useGetTime';
import { createPostsRequest } from '../sagas/posts/postsSlice';
import PageWrap from '../layout/common/PageWrap';
import LoadingRequest from '../layout/loading/LoadingRequest';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import useSetTitle from '../hooks/useSetTitle';
const schemaValidate = Yup.object({
    title: Yup.string().required("Vui lòng nhập tiêu đề!"),
    category: Yup.string().required("Vui lòng chọn chủ đề!"),
    content: Yup.string().required("Vui lòng nhập nội dung!"),
    image: Yup.mixed().required("Vui lòng nhập ảnh!"),
    // .min(6, 'Tên đăng nhập phải lớn hơn 6 kí tự'),

})
const AddNewPosts = () => {
    useSetTitle('Tạo bài viết')
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { socket, isUploadImage } = useSelector((state) => state.global)
    const { handleSubmit, formState: { errors, isSubmitting, isValid, isSubmitSuccessful }, control, reset } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onChange', })
    const { categories, loading } = useSelector((state) => state.categories)
    const { loading: loadingPost } = useSelector((state) => state.posts)
    const handleSendNotification = async () => {
        await socket.emit('notificationAdmin');
    }
    const handleSubmits = (value) => {
        const date = getDate()
        const timestamps = getTimestamp()
        const post = {
            ...value,
            date,
            timestamps
        }
        if (isValid) {
            dispatch(createPostsRequest({ post, reset, handleSendNotification }))
        }
    }
    useEffect(() => {
        dispatch(categoriesRequest())
    }, [token]);
    return (
        <>
            <LoadingRequest show={loading}></LoadingRequest>
            <LoadingRequest show={loadingPost}></LoadingRequest>
            <Section className='mb-10'>
                <BannerCommon image={'./src/assets/image/bg-add-post.jpg'} title={'Tạo bài viết'} />
            </Section>
            <PageWrap>
                <div className='page-content mt-5 px-2'>
                    <Heading isHeading>Tạo bài viết </Heading>
                    <form onSubmit={handleSubmit(handleSubmits)} className='mb-10 text-center'>
                        <div className='grid grid-cols-1 gap-10 pt-10 mb-10'>
                            <Field>
                                <InputTextarea control={control} errors={errors} value='' name='title'
                                    placeholder='Nhập tiêu đề bài viết' type='text' >
                                    <BookmarkIcon />
                                </InputTextarea>
                            </Field>
                            <Field>
                                <Select data={categories} control={control} name={'category'} errors={errors} />
                            </Field>
                            <div className=' mb-10'>
                                <Label htmlFor={"image"}>Hình ảnh</Label>
                                <FileInput
                                    control={control} name={'image'} errors={errors} lable={'Hình ảnh'} isSuccess={isSubmitSuccessful} isAddItem />
                            </div>
                            <div className=''>
                                <Field>
                                    <Label htmlFor={'content'}>Nội dung</Label>
                                    <Textarea control={control} errors={errors} name={'content'} />
                                </Field>
                            </div>
                        </div>
                        <Button type='submit' isLoading={isUploadImage} className=' mx-auto'>Tạo bài viết</Button>
                    </form>
                </div>
            </PageWrap>
        </>
    );
};

export default AddNewPosts;