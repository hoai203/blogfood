import React from 'react';

import { Link } from 'react-router-dom';
import Overlay from './common/Overlay';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotification } from '../sagas/global/globalSlice';
import { Avatar, Badge } from '@material-tailwind/react';
import { ChatBubbleLeftRightIcon, ChatBubbleOvalLeftEllipsisIcon, Cog6ToothIcon, EllipsisVerticalIcon, HeartIcon, NoSymbolIcon, ArrowUpTrayIcon, ArchiveBoxXMarkIcon } from '@heroicons/react/24/solid';
import useTimeSince from '../hooks/useTimeSince';
import { deleteAllNotificationRequest, deleteNotificationRequest, updateAllNotificationRequest, updateNotificationRequest } from '../sagas/notification/notificationSlice';
import { PopoverDrop } from './Popover';
import IconWrap from '../components/Icon/IconWrap';
import { EditIcon, EllipsisIcon, EyeOpenIcon, TrashIcon } from '../components/Icon';

const Notification = () => {
    const { showNotification } = useSelector((state) => state.global)
    const { notifications } = useSelector((state) => state.notification)
    const { token } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(closeNotification())
    }
    const handleUpdateAllNotification = () => {
        if (token && notifications?.length > 0) {
            dispatch(updateAllNotificationRequest())
        }
    }
    const handleDeleteAllNotification = () => {
        if (token && notifications?.length > 0) {
            dispatch(deleteAllNotificationRequest())
        }
    }
    return (
        <>
            <Overlay show={showNotification} onClick={handleClose}></Overlay>
            <div className={`flex-1 absolute text-black bg-white-cream flex top-full w-full   gap-2  p-5
            transition-all overflow-hidden
                flex-col  text-sm z-[10] right-0 shadow-soft border-t border-primary 
                md:max-w-[600px] max-h-[500px] overflow-y-auto  overscroll-none
                ${showNotification ? 'top-full' : 'invisible opacity-0'}`}>
                <div className='absolute font-bold text-base w-full left-0 pl-5 pb-3'>Thông báo</div>
                <div className='sticky top-0 mb-2 ml-auto cursor-pointer'>
                    <PopoverDrop x={80}
                        icon={
                            <Cog6ToothIcon className="h-6 w-6 text-gray-500" />
                        }
                        placement='left'
                        x_sm={80}>
                        <div className='flex flex-col items-center gap-5'>
                            <div onClick={handleUpdateAllNotification} className='flex items-center'>
                                <IconWrap className='cursor-pointer'><EyeOpenIcon />
                                    <p className='text-[10px] md:text-xs'>Đánh dấu xem tất cả</p></IconWrap>
                            </div>
                            <div onClick={handleDeleteAllNotification} className='cursor-pointer'>
                                <IconWrap><TrashIcon /> <p className='text-[10px] md:text-xs'>Xóa tất cả thông báo</p></IconWrap>
                            </div>
                        </div>
                    </PopoverDrop>
                </div>
                {
                    notifications?.length > 0 ? notifications.map((notify) => (
                        <ItemNotifiction key={notify?._id} notify={notify}></ItemNotifiction>
                    )) : <div className='text-center'>Không có thông báo nào</div>

                }
            </div>
        </>
    );
};
const ItemNotifiction = ({ notify }) => {
    const timeSince = useTimeSince()
    const dispatch = useDispatch()
    const { customers } = useSelector((state) => state.customers)
    const { admin, posts } = useSelector((state) => state.admin)
    const infoCusSend = customers?.filter((cus) => cus._id === notify?.id_sender)[0]
    const infoADSend = admin?.filter((cus) => cus._id === notify?.id_sender)[0]
    const infoPost = posts?.filter((post) => post._id === notify?.id_post)[0]
    const className = 'h-5 w-5 text-white'
    const infoAuth = infoCusSend || infoADSend
    let typeNotify = {
        icon: <></>,
        className: '',
        content: ''
    }
    const handleUpdateNotification = () => {
        if (notify?.status === true) {
            dispatch(updateNotificationRequest(notify?._id))
        }
        dispatch(closeNotification())
    }

    const handleDeleteNotification = () => {
        dispatch(deleteNotificationRequest(notify?._id))
    }
    switch (notify?.typeNotify) {
        case 'comment':
            typeNotify = {
                icon: <ChatBubbleOvalLeftEllipsisIcon className={className} />,
                className: 'bg-green-400',
                content: <span>đã bình luận bài viết  <span className='font-bold text-primary'>
                    {infoPost?.title}</span> của bạn</span>
            }
            break;
        case 'reply':
            typeNotify = {
                icon: <ChatBubbleLeftRightIcon className={className} />,
                className: 'bg-blue-400',
                content: <span>đã trả lời bình luận của bạn trong bài viết
                    <span className='font-bold text-primary'> {infoPost?.title}</span></span>
            }
            break;
        case 'approved':
            typeNotify = {
                icon: <ArrowUpTrayIcon className={className} />,
                className: 'bg-primary',
                content: <span>đã duyệt bài viết
                    <span className='font-bold text-primary'> {infoPost?.title}</span> của bạn</span>
            }
            break;
        case 'destroy':
            typeNotify = {
                icon: <ArchiveBoxXMarkIcon className={className} />,
                className: 'bg-red-600',
                content: <span>đã vô hiệu hóa bài viết
                    <span className='font-bold text-primary'> {infoPost?.title} </span> của bạn</span>
            }
            break;
        case 'like':
            typeNotify = {
                icon: <HeartIcon className={className} />,
                className: 'bg-red-400',
                content: <span>đã thích bài viết <span className='font-bold text-primary'>
                    {infoPost?.title}</span></span>
            }
            break;
        default:
            typeNotify = {
                icon: <NoSymbolIcon className={className} />,
                className: 'bg-black',
                content: <span>Thông báo không hợp lệ</span>
            }
            break;
    }
    const toLink = notify?.typeNotify === 'destroy' ? '#' : `/detail/${infoPost?.slug}#${notify?.id_comment}`;
    return (
        <div
            className={`px-5 py-3 rounded-lg flex gap-x-5 items-center transition-all
        ${notify?.status ? 'bg-primary/10' : ''}
        `}>
            <div className='flex gap-x-5 items-center' onClick={handleUpdateNotification}>
                <div>
                    <Badge
                        content={typeNotify.icon}
                        className={`${typeNotify.className} border-2
                        border-white shadow-lg shadow-black/20`}
                        placement="bottom-end"
                    >
                        <Avatar size='lg' className='border shadow-2xl' src={infoAuth?.image}></Avatar>
                    </Badge>
                </div>
                <Link to={toLink} className='flex-1 flex flex-col gap-y-2  '>
                    <div className='flex-1 line-clamp-3'>
                        <span className='font-bold'>{infoAuth?.full_name} </span>
                        {typeNotify.content}
                    </div>
                    <div className='text-gray-700 text-xs'>
                        {timeSince(notify?.timestamps)}
                    </div>
                </Link>
            </div>
            <div className='cursor-pointer ml-auto'>
                <PopoverDrop icon={<EllipsisIcon />} x={40} x_sm={40} placement='left'>
                    <div className='flex gap-x-2 items-center'>
                        <div className='flex items-center gap-5'>
                            <div className='cursor-pointer' onClick={handleDeleteNotification}>
                                <IconWrap><TrashIcon /> <p className='text-[10px] md:text-xs'>Xóa</p></IconWrap>
                            </div>
                        </div>
                    </div>
                </PopoverDrop>
            </div>
        </div>
    )
}

export default Notification;