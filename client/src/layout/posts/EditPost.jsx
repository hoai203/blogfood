import React, { useEffect } from 'react';
import ModalBase from '../modal/ModalBase';
import { Heading } from '../../components/heading';
import { Field } from '../../components/field';
import { BookmarkIcon } from '../../components/Icon';
import { Label } from '../../components/label';
import { Textarea } from '../../components/textarea';
import { FileInput, Input } from '../../components/input';
import { Select } from '../../components/select';
import { Button } from '../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { postDetailRequest, updatePostRequest } from '../../sagas/posts/postsSlice';
import { categoriesRequest } from '../../sagas/categories/categoriesSlice';
import LayoutAdminModel from '../adminLayout/LayoutAdminModel';
import { useNavigate } from "react-router-dom";
import { closeEditPostCustomer } from '../../sagas/global/globalSlice';
import { addNotificationRequest } from '../../sagas/notification/notificationSlice';

const schemaValidate = Yup.object({
    title: Yup.string().required("Vui lòng nhập tiêu đề!"),
    content: Yup.string().required("Vui lòng nhập nội dung!"),
    category: Yup.string().required("Vui lòng chọn chủ đề!"),
    image: Yup.mixed(),
})

const EditPost = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { handleSubmit, setValue, formState: { errors }, control } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onChange', })
    const { categories } = useSelector((state) => state.categories);
    const { detail_post } = useSelector((state) => state.posts);
    const { showEditPostCustomer, slug, socket, isUploadImage } = useSelector((state) => state.global);
    const handleSetURL = (URL) => {
        navigate(`/detail/${URL}`, { replace: true })
    }
    const handleClose = () => {
        dispatch(closeEditPostCustomer())
    }
    const handleNotifyEditPost = () => {
        dispatch(addNotificationRequest(
            { id_post: detail_post._id, id_customer: 'admin', typeNotify: 'editPost' }
        ))
    }
    const handleSendNotification = () => {
        if (socket) {
            socket.emit('notificationAdmin');
        }
    }
    const handleSubmits = (value) => {
        try {
            const post = { ...value }
            dispatch(updatePostRequest(
                { id: detail_post._id, post, handleSetURL, handleNotifyEditPost, handleSendNotification }))
            handleClose()
            resetImageField()
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
        }
    }

    const resetImageField = () => {
        setValue('image', '');
    };
    useEffect(() => {
        setValue('title', detail_post?.title)
        setValue('content', detail_post?.content)
        setValue('category', detail_post?.category)
    }, [detail_post]);
    useEffect(() => {
        dispatch(categoriesRequest())
    }, []);
    useEffect(() => {
        if (slug) {
            dispatch(postDetailRequest({ slug }))
        }
    }, [slug]);
    return (
        <ModalBase onClose={handleClose} visible={showEditPostCustomer}>
            <LayoutAdminModel onClick={handleClose} z={9999}>
                <Heading isHeading>Chỉnh sửa bài viết </Heading>
                <form onSubmit={handleSubmit(handleSubmits)} className='mb-10 text-center'>
                    <div className='grid grid-cols-1 gap-y-10 pt-10 mb-10'>
                        <Field>
                            <Input control={control} errors={errors} value={detail_post?.title} name='title'
                                placeholder='Nhập tiêu đề bài viết' type='text' >
                                <BookmarkIcon />
                            </Input>
                        </Field>
                        <Field>
                            <Select value={detail_post?.category} data={categories} control={control}
                                name={'category'} />
                        </Field>
                        <div className='mb-10'>
                            <Label htmlFor={"image"}>Hình ảnh</Label>
                            <FileInput oldImage={detail_post?.image}
                                control={control} name={'image'} errors={errors} lable={'Hình ảnh'} />
                        </div>
                        <div className=''>
                            <Field>
                                <Label htmlFor={'content'}>Nội dung</Label>
                                <Textarea value={detail_post?.content} control={control} errors={errors} name={'content'} />
                            </Field>
                        </div>
                    </div>
                    <Button type='submit' isLoading={isUploadImage} className=' mx-auto'>Sửa bài viết</Button>
                </form>
            </LayoutAdminModel>
        </ModalBase>
    );
};

export default EditPost;