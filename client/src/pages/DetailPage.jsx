import React, { useEffect } from 'react';
import Heading from '../components/heading/Heading';
import Avatar from '../layout/customers/Avatar';
import { CommentIcon, EditIcon, EllipsisIcon, HeartIcon } from '../components/Icon';
import ListPostsSidebar from '../layout/posts/ListPostsSidebar';
import SlideWrap from '../layout/slide/SlideWrap';
import PostItem from '../layout/posts/PostItem';
import DataPost from '../layout/posts/DataPost';
import CommentItem from '../layout/comments/CommentItem';
import { Input } from '../components/input';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { toast } from 'react-toastify';
import { commentsRequest, createCommentsRequest, getcommentsByPostRequest } from '../sagas/comments/commentsSlice';
import { getDate, getTimestamp } from '../hooks/useGetTime';
import { ButtonComment } from '../components/button';
import { getPostsByCategoryRequest, getPostsByCustomerRequest, likePostRequest, postDetailRequest } from '../sagas/posts/postsSlice';
import EditPost from '../layout/posts/EditPost';
import IconWrap from '../components/Icon/IconWrap';
import LoadingRequest from '../layout/loading/LoadingRequest';
import { PopoverDrop } from '../layout/Popover';
import { addNotificationRequest } from '../sagas/notification/notificationSlice';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import Breadcrumb from '../layout/Breadcumb';
import { setBreadcrumb, setSlug, toggleEditPostCustomer } from '../sagas/global/globalSlice';
import { adminInfoRequest } from '../sagas/customers/customersSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import useLoadingImage from '../hooks/useLoadingImage';


const schemaValidate = Yup.object({
    content: Yup.string().required("Vui lòng nhập nội dung!"),
})

const DetailPage = () => {
    const { slug } = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { detail_post, loading, postsCategory, postsCustomer, error } = useSelector((state) => state.posts);
    const { token, infoAuth } = useSelector((state) => state.auth);
    const { customers, customer_detail } = useSelector((state) => state.customers);
    const { categories } = useSelector((state) => state.categories);
    const { socket } = useSelector((state) => state.global);

    const { commentsPost } = useSelector((state) => state.comments);
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control, reset } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onChange', })
    const handleResetForm = () => {
        reset()
    }
    const handleToggleEditPost = () => {
        dispatch(toggleEditPostCustomer())
        dispatch(setSlug(slug))
    }
    const dataCategory = categories?.filter((cate) => cate._id === detail_post?.category)[0]
    const postByCategories = postsCategory?.filter((post) => post?.slug !== slug);

    const customerByPosts = customers?.filter((customer) => customer?._id === detail_post?.id_customer)[0];

    const rootComment = commentsPost?.filter(comment => comment?.parent_comment_id === '')
    const listLikes = detail_post?.likes;
    const id_post = detail_post?._id;
    const id_category = detail_post?.category;
    const id_customer = detail_post?.id_customer;
    const isLiked = listLikes?.some((id) => id === infoAuth?._id)
    const isAuth = customerByPosts?._id === infoAuth?._id
    const typeAuthor = detail_post?.authorType;
    const getReplies = (commentId) => {
        return commentsPost?.filter(commentByPost => commentByPost?.parent_comment_id === commentId)
    }
    const handleLikePost = () => {
        if (!token) return toast.warning("Bạn chưa đăng nhập!")
        if (isLiked) {
            return dispatch(likePostRequest({ id: id_post, slug }))
        }
        dispatch(likePostRequest({ id: id_post, slug }))
        if (socket) {
            const id_receiver = detail_post?.id_customer;
            socket.emit('receiverNotify', { id_receiver });
        }
        if (infoAuth?._id !== id_customer) {
            dispatch(addNotificationRequest({ id_post, id_customer, typeNotify: 'like' }))
        }
    }
    const handleComment = (value) => {
        if (isValid) {
            const date = getDate()
            const timestamps = getTimestamp()
            const id_receiver = detail_post?.id_customer;
            const id_sender = infoAuth?._id
            const comment = {
                ...value,
                id_post: detail_post._id,
                date,
                timestamps
            }
            dispatch(createCommentsRequest({ comment, id_post, id_receiver, id_sender, typeNotify: 'comment' }))
            if (infoAuth?._id !== id_customer && socket) {
                socket.emit('receiverNotify', { id_receiver })
            } else {
                socket.emit('update')
            }
            handleResetForm()
        } else {
            toast.error('Nhập nội dung trước khi bình luận')
        }
    }
    const handleReloadComment = () => {
        dispatch(getcommentsByPostRequest({ id_post }))
    }
    useEffect(() => {
        dispatch(postDetailRequest({ slug }))
        dispatch(commentsRequest())
    }, [slug]);
    useEffect(() => {
        dispatch(getPostsByCategoryRequest({ id_category }))
    }, [id_category]);
    useEffect(() => {
        dispatch(getcommentsByPostRequest({ id_post }))
    }, [id_post]);
    useEffect(() => {
        dispatch(getPostsByCustomerRequest({ id_customer }))
    }, [id_customer]);
    useEffect(() => {
        if (socket && id_post) {
            socket.on('update', () => {
                setTimeout(() => {
                    dispatch(getcommentsByPostRequest({ id_post }))
                }, 200);
            })
        }
    }, [socket, id_post]);
    const hash = window.location.hash.substring(1);
    useEffect(() => {
        const scrollToCenter = () => {
            if (hash) {
                const element = document.getElementById(hash);
                if (element) {
                    const elementRect = element.getBoundingClientRect();
                    const absoluteElementTop = elementRect.top + window.scrollY;
                    const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
                    window.scrollTo({ top: middle, behavior: 'smooth' });
                    element.className = 'bg-primary/10 transition-all rounded-lg'
                    setTimeout(() => {
                        element.className = 'relative'
                    }, 1500);
                }
            }
        };
        if (hash) {
            setTimeout(scrollToCenter, 1200);
        }
    }, [hash]);
    useEffect(() => {
        if (!loading && error?.message && Object.keys(detail_post).length < 1) {
            navigate('/not-found')
        }
    }, [loading, error, detail_post]);
    useEffect(() => {
        document.title = detail_post?.title
        dispatch(setBreadcrumb(detail_post?.title))
    }, [detail_post]);
    useEffect(() => {
        if (typeAuthor === 'admin') {
            dispatch(adminInfoRequest({ id: id_customer }))
        }
    }, [typeAuthor]);
    useLoadingImage(postByCategories)
    return (
        <>
            <LoadingRequest show={loading}></LoadingRequest>
            <div className='w-full lg:max-h-[700px] min-h-[200px] py-52 lg:py-72 bg-fixed bg-cover
                bg-center h-auto overflow-hidden relative  md:min-h-[300px] lg:min-h-[500px] '
                style={{ backgroundImage: `url(${detail_post?.image})` }}>
                <div className='absolute inset-0 bg-black bg-opacity-70'>
                    <div className='page-content px-5 lg:px-10 flex flex-col h-full text-white flex-1 
                        justify-center items-center' >
                        <div className='page-content flex items-start mb-7'>
                            <Breadcrumb></Breadcrumb>
                        </div>
                        <Heading isHeading
                            className='lg:text-5xl md:text-3xl text-2xl font-normal text-center md:text-start 
                        lg:leading-normal leading-normal'>
                            {detail_post?.title}
                        </Heading>
                        <div className='text-white text-center md:text-start text-xs md:text-sm 
                        lg:text-base uppercase opacity-80  mt-10 flex '>
                            {typeAuthor === 'customer' ? <Link to={`/info/${customerByPosts?.slug}`}
                                className='px-2 border-r last:border-none'>{customerByPosts?.full_name}</Link>
                                : typeAuthor === 'admin'
                                    ? <div className='px-2 border-r last:border-none'>{customer_detail?.full_name}</div>
                                    : ''}
                            <div className='px-2 border-r last:border-none'>{detail_post?.date} </div>
                            <Link to={`/categories/${dataCategory?.slug}`}
                                className='px-2 border-r last:border-none'>{dataCategory?.title}</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='page-content md:mt-5 mb-10'>
                <div className='px-2 lg:mx-0 '>
                    <div className='border-b border-b-primary mb-10'>
                        <div className='flex  gap-x-5 md:gap-x-10 gap-y-3 items-center justify-between md:justify-normal
                            !text-xs my-5 '>
                            {typeAuthor === 'customer'
                                ? (
                                    <Link to={`/info/${customerByPosts?.slug}`} className='flex gap-3 items-center'>
                                        <Avatar image={customerByPosts?.image} ></Avatar>
                                        <h2 className='text-xs md:text-sm font-medium flex-1'>{customerByPosts?.full_name}</h2>
                                    </Link>
                                )
                                : typeAuthor === 'admin'
                                    ? <div className='flex gap-3 items-center'>
                                        <Avatar image={customer_detail?.image}></Avatar>
                                        <h2 className='text-xs md:text-sm font-bold'>
                                            {customer_detail?.full_name}
                                            <span className='text-primary'> <FontAwesomeIcon icon={faCrown} /></span></h2>
                                    </div>
                                    : ''}
                            <div className=' flex gap-10 items-center'>
                                <DataPost isDetail timestamps={detail_post?.timestamps}
                                    comments={commentsPost?.length} likes={listLikes}></DataPost>
                                {isAuth && typeAuthor === 'customer' && <PopoverDrop x={80} icon={<EllipsisIcon />}>
                                    <div className='flex items-center gap-5'>
                                        <div onClick={handleToggleEditPost} className='flex items-center'>
                                            <IconWrap className='cursor-pointer'><EditIcon />
                                                <p className='text-[10px] md:text-xs'>Chỉnh sửa</p></IconWrap>
                                        </div>
                                    </div>
                                </PopoverDrop>}
                            </div>
                            <div className='text-3xl ml-auto  flex justify-end'>
                                <div className='cursor-pointer' onClick={handleLikePost}>
                                    <HeartIcon isLiked={isLiked} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-10'>
                        <div className='col-span-3 lg:col-span-3 overflow-hidden'>
                            <div className='mb-10 w-full max-w-[800px] m-auto'>
                                <img src={detail_post?.image} alt="" className='w-full max-h-[400px] object-cover
                                rounded-lg' />
                            </div>
                            <div className='text-xs leading-6 md:text-sm lg:text-base'>
                                <div dangerouslySetInnerHTML={{ __html: detail_post?.content }}
                                    className='content_post !text-xs md' />
                            </div>
                        </div>
                    </div>
                    <div className='mt-10 '>
                        <span id='commentPost'></span>
                        <div className='pb-5 flex items-center gap-x-5' >
                            <Heading isHeading className='ml-0' >
                                Bình luận
                            </Heading>
                            <span>({commentsPost?.length})</span>
                            <span className='cursor-pointer' onClick={handleReloadComment}>
                                <ArrowPathIcon className="h-6 w-6 text-gray-500"></ArrowPathIcon>
                            </span>
                        </div>
                        {token && <div className='mt-5 lg:mb-10 w-full bg-white py-3 px-2'>
                            <form onSubmit={handleSubmit(handleComment)} autoComplete='off'
                                className='flex items-center gap-x-4'>
                                <div className='flex-1'>
                                    <Input name={'content'} control={control} errors={errors} value=''
                                        type='text' placeholder='Nhập nội dung bình luận' >
                                        <CommentIcon></CommentIcon>
                                    </Input>
                                </div>
                                <ButtonComment isLoading={isSubmitting} />
                            </form>
                        </div>}
                        <div className='my-5'>
                            {rootComment?.length > 0 && rootComment.map(comment => (
                                <CommentItem key={comment._id} comment={comment} replies={getReplies}
                                    id_post={detail_post._id} id_customer_post={detail_post?.id_customer}></CommentItem>
                            ))}
                            {rootComment?.length < 1 && (<p className='text-sm text-center'>Chưa có bình luận nào!</p>)}
                        </div>
                    </div>
                    <div className='my-20'>
                        <Heading isHeading className='mb-10 ml-0 text-center'>
                            - Bài viết liên quan -
                        </Heading>
                        <ListPostsSidebar message='Không có bài viết liên quan' data={postByCategories}></ListPostsSidebar>
                    </div>
                    <div className='mt-20'>
                        <Heading isHeading className='mb-10 ml-0 text-center'>
                            - Bài viết khác của tác giả -
                        </Heading>
                        <SlideWrap desktop={3} tablet={2} mobile={1} spaceBetween={10}>
                            {postsCustomer?.length > 0 && postsCustomer.map(item => {
                                if (item?.status !== 'approved') return
                                return (
                                    <SwiperSlide key={item._id}>
                                        <PostItem isSingle data={item}></PostItem>
                                    </SwiperSlide>
                                )
                            })}
                        </SlideWrap>
                    </div>
                </div>
            </div>
        </>
    );
};
export default DetailPage;
