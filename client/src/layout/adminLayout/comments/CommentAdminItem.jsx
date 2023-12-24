import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useTimeSince from '../../../hooks/useTimeSince';
import useClickOutSide from '../../../hooks/useClickOutSide';
import useToggle from '../../../hooks/useToggle';
import { getDate, getTimestamp } from '../../../hooks/useGetTime';
import { createCommentsAdminRequest, createCommentsRequest, deleteCommentAdminRequest, deleteCommentRequest, updateCommentAdminRequest, updateCommentRequest } from '../../../sagas/comments/commentsSlice';
import Avatar from '../../customers/Avatar';
import { DiaLog } from '../../DiaLog';
import { Heading } from '../../../components/heading';
import IconWrap from '../../../components/Icon/IconWrap';
import { CommentIcon, EditIcon, EllipsisIcon, TrashIcon } from '../../../components/Icon';
import { PopoverDrop } from '../../Popover';
import { Input } from '../../../components/input';
import { ButtonComment } from '../../../components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

const schemaValidateReply = Yup.object({
    content: Yup.string().required("Vui lòng nhập bình luận!")
})
const CommentAdminItem = ({ comment, replies = () => { }, countR = 0, id_post, id_customer_post }) => {
    const dispatch = useDispatch()
    const timeSince = useTimeSince()
    const { customers } = useSelector((state) => state.customers);
    const { infoAdmin, tokenAdmin, admin } = useSelector((state) => state.admin);
    const id_admin = infoAdmin?._id
    const { socketAdmin } = useSelector((state) => state.global);
    const customerByComment = customers.filter((cus) => cus._id === comment?.id_customer)[0]
    const adminByComment = admin.filter((cus) => cus._id === comment?.id_customer)[0]
    const isAuth = adminByComment?._id === id_admin
    const countReply = countR + 1
    const listReplies = replies(comment?._id);
    const { show: showReply, setShow: setShowReply, domRef: domReply } = useClickOutSide("#reply");
    const { show: showEdit, setShow: setShowEdit, domRef: domEdit } = useClickOutSide("#edit_comment");
    const { handleToggle, handleToggleFalse, toggle } = useToggle(false)
    // REPLY :)
    const { handleSubmit: handleSubmitReply, formState: { errors: errorsReply,
        isSubmitting: isSubmittingReply, isValid: isValidReply }, control: controlReply } =
        useForm({ resolver: yupResolver(schemaValidateReply), mode: 'onChange', })

    const handleReplyComment = (value) => {
        const date = getDate()
        const timestamps = getTimestamp()
        const id_receiver = comment?.id_customer;
        const id_sender = id_admin
        const comments = {
            ...value,
            id_post,
            date,
            timestamps,
            parent_comment_id: comment._id
        }
        dispatch(createCommentsAdminRequest({ comment: comments, id_post, id_receiver, id_sender, typeNotify: 'reply', id_customer_post }))
        if (infoAdmin?._id !== id_receiver && socketAdmin) {
            socketAdmin.emit('receiverNotify', { id_receiver })
        }
        if (infoAdmin?._id !== id_customer_post && socketAdmin) {
            socketAdmin.emit('receiverNotify', { id_receiver: id_customer_post })
        }
        setShowReply(false)
    }

    // EDIT COMMENT
    const { handleSubmit: handleSubmitEditComment, formState: { errors: errorsEditComment,
        isSubmitting: isSubmittingEditComment, isValid: isValidEditComment }, control: controlEditComment } =
        useForm({ resolver: yupResolver(schemaValidateReply), mode: 'onChange', })
    const handleEditComment = (value) => {
        dispatch(updateCommentAdminRequest({ id: comment._id, comment: value, id_post }))
        setShowEdit(false)
        socketAdmin.emit('update')
    }
    const handleDeleteComment = () => {
        dispatch(deleteCommentAdminRequest({ id: comment._id, id_post }))
        handleToggleFalse()
        socketAdmin.emit('update')
    }

    const handleShowReply = () => {
        setShowReply(!showReply)
        setShowEdit(false)
    }
    const handleShowEdit = () => {
        setShowEdit(!showEdit)
        setShowReply(false)
    }
    const infoAuth = customerByComment || adminByComment
    const toLink = `/admin/${infoAuth?.admin ? 'manage#id_admin' : 'customers#id_customer'}=${infoAuth?._id}`
    return (
        <div className='relative' id={comment?._id}>
            <DiaLog open={toggle} handleOpen={handleToggle} header='Bạn có muốn xóa bình luận không!' title='Bình luận đã xóa sẽ không thể khôi phục' onClick={handleDeleteComment}></DiaLog>
            <div className={`flex gap-x-3 lg:gap-x-5 items-start mt-12 ${countReply > 1 ? 'mt-7' : ''}`} >
                <Link to={toLink}>
                    <Avatar className='!h-8 !w-8 lg:!h-10 lg:!w-10' image={infoAuth?.image}></Avatar>
                </Link>
                <div className='mt-0 flex-1' >
                    <Link to={toLink} className={infoAuth?.admin && 'text-primary'}>
                        <Heading className='text-sm md:text-base font-semibold'>{infoAuth?.full_name}
                            <span className={`font-normal text-gray-500 text-sm
                                ${infoAuth?.admin && 'text-primary'}`}>
                                {infoAuth?.admin && <span> <FontAwesomeIcon icon={faCrown} /></span>}
                                {isAuth
                                    ? ' (bạn)'
                                    : comment?.id_customer === id_customer_post ? ' (tác giả)' : ''}
                            </span>
                        </Heading>
                    </Link>
                    <div className='font-normal text-gray-500 text-xs'> @{infoAuth?.user_name}</div>
                    <span className='text-[11px] text-text-gray font-medium '>
                        {timeSince(comment?.timestamps || Date.now())}</span>
                    <p className='text-xs md:text-sm my-2 mb-5  lg:my-4'>
                        {comment.content}</p>
                    {tokenAdmin && <div ref={domReply}>
                        <div ref={domEdit}>
                            <div className='flex items-center gap-x-4 lg:gap-x-6 text-text-gray flex-wrap 
                            gap-y-5'>
                                <div onClick={handleShowReply} className="z-[2] ">
                                    <IconWrap className='cursor-pointer'><CommentIcon />
                                        <p className='text-[10px] md:text-xs'>
                                            Trả lời </p></IconWrap>
                                </div>
                                <PopoverDrop x={-80} icon={<EllipsisIcon />}>
                                    <div className="flex items-center gap-5">
                                        {isAuth &&
                                            <div onClick={(e) => { e.stopPropagation(); handleShowEdit(); }}>
                                                <IconWrap className='cursor-pointer'>
                                                    <EditIcon />
                                                    <p className='text-[10px] md:text-xs'>Chỉnh sửa</p>
                                                </IconWrap>
                                            </div>
                                        }
                                        {infoAdmin?.admin && <div className='cursor-pointer'
                                            onClick={handleToggle}>
                                            <IconWrap><TrashIcon />
                                                <p className='text-[10px] md:text-xs'>
                                                    Xóa</p>
                                            </IconWrap>
                                        </div>}
                                    </div>
                                </PopoverDrop>
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
                        <CommentAdminItem key={reply._id} comment={reply} replies={replies}
                            countR={countReply} id_post={id_post} id_customer_post={id_customer_post}></CommentAdminItem>
                    ))}
                </div>
            </div>
            {/* LIST COMMENT REPLY lần 2 trở lên */}
            {listReplies?.length > 0 && countReply > 2 && listReplies.map(reply => (
                <CommentAdminItem key={reply._id} comment={reply} replies={replies} countR={countReply} id_post={id_post} id_customer_post={id_customer_post}></CommentAdminItem>
            ))}
        </div>
    );
};

export default CommentAdminItem;