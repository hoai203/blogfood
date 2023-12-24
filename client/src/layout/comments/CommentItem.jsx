import React, { useEffect } from 'react';
import Avatar from '../customers/Avatar';
import { Heading } from '../../components/heading';
import IconWrap from '../../components/Icon/IconWrap';
import { CommentIcon, EditIcon, EllipsisIcon, TrashIcon } from '../../components/Icon';
import { Input } from '../../components/input';
import useClickOutSide from '../../hooks/useClickOutSide';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import useTimeSince from '../../hooks/useTimeSince';
import { getDate, getTimestamp } from '../../hooks/useGetTime';
import { deleteCommentRequest, createCommentsRequest, updateCommentRequest } from '../../sagas/comments/commentsSlice';
import { ButtonComment } from '../../components/button';
import { DiaLog } from '../DiaLog';
import useToggle from '../../hooks/useToggle';
import { PopoverDrop } from "../Popover";
import { Link } from 'react-router-dom';
import { adminInfoRequest } from '../../sagas/customers/customersSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

const schemaValidateReply = Yup.object({
    content: Yup.string().required("Vui lòng nhập bình luận!")
})
const CommentItem = ({ comment, replies = () => { }, countR = 0, id_post, id_customer_post }) => {
    const dispatch = useDispatch()
    const timeSince = useTimeSince()
    const { customers, customer_detail } = useSelector((state) => state.customers);
    const { socket } = useSelector((state) => state.global);
    const customerByComment = customers.filter((cus) => cus._id === comment?.id_customer)[0]
    const { infoAuth } = useSelector((state) => state.auth);
    let isAuth = false
    if (customerByComment?._id && infoAuth?._id) {
        isAuth = customerByComment?._id === infoAuth?._id
    }
    const countReply = countR + 1
    const listReplies = replies(comment?._id);
    const { show: showReply, setShow: setShowReply, domRef: domReply } = useClickOutSide("#reply");
    const { show: showEdit, setShow: setShowEdit, domRef: domEdit } = useClickOutSide("#edit_comment");
    const { handleToggle, handleToggleFalse, toggle } = useToggle(false)
    const { token } = useSelector((state => state.auth))
    // REPLY :)
    const { handleSubmit: handleSubmitReply, formState: { errors: errorsReply,
        isSubmitting: isSubmittingReply, isValid: isValidReply }, control: controlReply } =
        useForm({ resolver: yupResolver(schemaValidateReply), mode: 'onChange', })

    const handleReplyComment = (value) => {
        const date = getDate()
        const timestamps = getTimestamp()
        const id_receiver = comment?.id_customer;
        const id_sender = infoAuth?._id
        const comments = {
            ...value,
            id_post,
            date,
            timestamps,
            parent_comment_id: comment._id
        }
        dispatch(createCommentsRequest({ comment: comments, id_post, id_receiver, id_sender, typeNotify: 'reply', id_customer_post }))
        if (infoAuth?._id !== id_receiver && socket) {
            socket.emit('receiverNotify', { id_receiver })
        }
        if (infoAuth?._id !== id_customer_post && socket) {
            socket.emit('receiverNotify', { id_receiver: id_customer_post })
        }
        setShowReply(false)
    }

    // EDIT COMMENT
    const { handleSubmit: handleSubmitEditComment, formState: { errors: errorsEditComment,
        isSubmitting: isSubmittingEditComment, isValid: isValidEditComment }, control: controlEditComment } =
        useForm({ resolver: yupResolver(schemaValidateReply), mode: 'onChange', })
    const handleEditComment = (value) => {
        dispatch(updateCommentRequest({ id: comment._id, comment: value, id_post }))
        setShowEdit(false)
        socket.emit('update')
    }
    const handleDeleteComment = () => {
        dispatch(deleteCommentRequest({ id: comment._id, id_post }))
        handleToggleFalse()
        socket.emit('update')
    }

    const handleShowReply = () => {
        setShowReply(!showReply)
        setShowEdit(false)
    }
    const handleShowEdit = () => {
        setShowEdit(!showEdit)
        setShowReply(false)
    }
    useEffect(() => {
        if (!customerByComment?._id) {
            dispatch(adminInfoRequest({ id: comment?.id_customer }))
        }
    }, [customerByComment]);
    const infoAuthComment = customerByComment || customer_detail
    if (infoAuthComment && infoAuthComment?.status !== 'approved') {
        return (<></>)
    }
    return (
        <div className='relative' id={comment?._id}>
            <DiaLog open={toggle} handleOpen={handleToggle} header='Bạn có muốn xóa bình luận không!' title='Bình luận đã xóa sẽ không thể khôi phục' onClick={handleDeleteComment}></DiaLog>
            <div className={`flex gap-x-3 lg:gap-x-5 items-start mt-12 ${countReply > 1 ? 'mt-7' : ''}`} >
                <Link to={infoAuthComment?.admin ? '#' : `/info/${customerByComment?.slug}`}>
                    <Avatar className='!h-8 !w-8 lg:!h-10 lg:!w-10' image={infoAuthComment?.image}></Avatar>
                </Link>
                <div className='mt-0 flex-1' >
                    <Link to={infoAuthComment?.admin ? '#' : `/info/${customerByComment?.slug}`}
                        className={infoAuthComment?.admin && 'text-primary'}>
                        <Heading className='text-sm md:text-base font-semibold'>{infoAuthComment?.full_name}
                            <span className={`font-normal text-gray-500 text-sm
                                ${infoAuthComment?.admin && 'text-primary'}`}>
                                {infoAuthComment?.admin && <span> <FontAwesomeIcon icon={faCrown} /></span>}
                                {isAuth
                                    ? ' (bạn)'
                                    : comment?.id_customer === id_customer_post ? ' (tác giả)' : ''}
                            </span>
                        </Heading>
                    </Link>
                    <div className='font-normal text-gray-500 text-xs'> @{infoAuthComment?.user_name}</div>
                    <span className='text-[11px] text-text-gray font-medium '>
                        {timeSince(comment?.timestamps || Date.now())}</span>
                    <p className='text-xs md:text-sm my-2 mb-5  lg:my-4'>
                        {comment.content}</p>
                    {token && <div ref={domReply}>
                        <div ref={domEdit}>
                            <div className='flex items-center gap-x-4 lg:gap-x-6 text-text-gray flex-wrap 
                            gap-y-5'>
                                <div onClick={handleShowReply} className="z-[2] ">
                                    <IconWrap className='cursor-pointer'><CommentIcon />
                                        <p className='text-[10px] md:text-xs'>
                                            Trả lời </p></IconWrap>
                                </div>
                                {isAuth &&
                                    <PopoverDrop x={-80} icon={<EllipsisIcon />}>
                                        <div className="flex items-center gap-5">
                                            <div onClick={(e) => { e.stopPropagation(); handleShowEdit(); }}>
                                                <IconWrap className='cursor-pointer'>
                                                    <EditIcon />
                                                    <p className='text-[10px] md:text-xs'>Chỉnh sửa</p>
                                                </IconWrap>
                                            </div>
                                            <div className='cursor-pointer' onClick={handleToggle}>
                                                <IconWrap><TrashIcon />
                                                    <p className='text-[10px] md:text-xs'>
                                                        Xóa</p>
                                                </IconWrap>
                                            </div>
                                        </div>
                                    </PopoverDrop>
                                }
                            </div>
                            {/* REPLY */}
                            <div className={`mt-5  w-full bg-white py-3 z-[0] px-2 transition-all
                                ${showReply ? 'block opacity-100 visible translate-y-0' : 'absolute pointer-events-none invisible opacity-0 -translate-y-full'}`}>
                                <form onSubmit={handleSubmitReply(handleReplyComment)} id='reply' autoComplete='off'
                                    className='flex items-center gap-x-4'>
                                    <div className='flex-1'>
                                        <Input name={'content'} control={controlReply} errors={errorsReply} value=''
                                            type='text' placeholder='Nhập nội dung bình luận' >
                                            <CommentIcon></CommentIcon>
                                        </Input>
                                    </div>
                                    <ButtonComment isLoading={isSubmittingReply} />
                                </form>
                            </div>
                            {/* EDIT COMMENT */}
                            <div className={`mt-5 w-full bg-white py-3 px-2 transition-all
                                ${showEdit ? 'block opacity-100 visible translate-y-0' : 'absolute pointer-events-none invisible opacity-0 -translate-y-full'}`}>
                                <form onSubmit={handleSubmitEditComment(handleEditComment)}
                                    id='edit_comment' autoComplete='off'
                                    className='flex items-center gap-x-4'>
                                    <div className='flex-1'>
                                        <Input name={'content'} control={controlEditComment} errors={errorsEditComment}
                                            value={comment?.content} type='text' placeholder='Sửa bình luận' >
                                            <CommentIcon></CommentIcon>
                                        </Input>
                                    </div>
                                    <ButtonComment isLoading={isSubmittingEditComment} />
                                </form>
                            </div>
                        </div></div>}
                    {/* LIST COMMENT REPLY 1 lần */}
                    {listReplies?.length > 0 && countReply < 3 && listReplies.map(reply => (
                        <CommentItem key={reply._id} comment={reply} replies={replies}
                            countR={countReply} id_post={id_post} id_customer_post={id_customer_post}></CommentItem>
                    ))}
                </div>
            </div>
            {/* LIST COMMENT REPLY lần 2 trở lên */}
            {listReplies?.length > 0 && countReply > 2 && listReplies.map(reply => (
                <CommentItem key={reply._id} comment={reply} replies={replies} countR={countReply} id_post={id_post} id_customer_post={id_customer_post}></CommentItem>
            ))}
        </div>
    );
};

export default CommentItem;