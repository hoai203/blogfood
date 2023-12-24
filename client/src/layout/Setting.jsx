import React, { startTransition, useEffect } from 'react';
import Overlay from './common/Overlay';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../sagas/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { closeSetting } from '../sagas/global/globalSlice';
import { setNotification } from '../sagas/notification/notificationSlice';
import {
    UserCircleIcon, DocumentPlusIcon, ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import { icon } from '../ADMIN/routes';
const Setting = () => {
    const navigate = useNavigate();
    const { token, infoAuth } = useSelector((state) => state.auth)
    const { socket, showSetting } = useSelector((state) => state.global);
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(closeSetting())
    }
    const handleLogout = () => {
        const id = infoAuth?._id
        startTransition(() => {
            socket.disconnect(id)
            socket.emit('userUnconnect', id);
            dispatch(setNotification())
            dispatch(logout({ id }));
            dispatch(closeSetting());
            navigate('/');
        });
    }
    const handleSignin = () => {
        startTransition(() => {
            navigate('/signin');
        });
    }
    const className = 'flex items-center gap-x-2'
    return (
        <>
            <Overlay show={showSetting} onClick={handleClose}></Overlay>
            <div className={`flex-1 absolute text-black bg-white-cream flex top-full w-full justify-center gap-5 
            transition-all
                flex-col px-5 py-5 text-sm z-[10] right-0 shadow-soft border-t border-primary 
                md:max-w-[240px] 
                ${showSetting ? 'top-full' : 'invisible opacity-0'}`}>
                {token ? <>
                    <Link className={className}
                        to={`/info/${infoAuth?.slug}`}><UserCircleIcon {...icon} />Thông tin người dùng</Link>
                    <Link className={className} to={'/add-post'}><DocumentPlusIcon  {...icon} /> Thêm bài viết</Link>
                    <hr />
                    <div className={`cursor-pointer text-red-500 ${className}`}
                        onClick={handleLogout}><ArrowRightOnRectangleIcon {...icon} /> Đăng xuất</div>
                </> :
                    <>
                        <div onClick={handleSignin} className={`cursor-pointer text-primary ${className}`}>
                            <ArrowRightOnRectangleIcon {...icon} />Đăng Nhập</div>
                    </>}
            </div>
        </>
    );
};

export default Setting;