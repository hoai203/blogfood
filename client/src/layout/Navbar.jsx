import React from 'react';

import { NavLink } from 'react-router-dom';
import Overlay from './common/Overlay';
import { Heading } from '../components/heading';
import { useDispatch, useSelector } from 'react-redux';
import { closeNavbar } from '../sagas/global/globalSlice';

export const listLink = [
    {
        id: 1,
        title: 'Trang chủ',
        to: '/',
    },
    {
        id: 2,
        title: 'Danh mục',
        to: '/categories',
    },
    {
        id: 3,
        title: 'Bài viết',
        to: '/posts',
    },
    {
        id: 4,
        title: 'Về FoodsViet',
        to: '/about',
    },
    {
        id: 5,
        title: 'Liên hệ',
        to: '/contact',
    },
]

const Navbar = () => {
    const { showNavbar } = useSelector((state) => state.global)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(closeNavbar())
    }
    return (
        <>
            <Overlay show={showNavbar} onClick={handleClose}></Overlay>
            <div className={`flex-1 absolute  bg-white-cream flex top-full w-full justify-center gap-5 transition-all
                flex-col px-5 py-5 text-sm z-[10] shadow-soft border-t border-primary
                ${showNavbar ? 'left-0' : '-left-full'}
                 lg:static lg:flex-row lg:p-0 lg:bg-transparent lg:flex lg:gap-10
                lg:shadow-transparent lg:border-0`}>
                {listLink.map(({ to, title, id }) => (
                    <NavLink
                        className={({ isActive }) => isActive ? 'text-primary' : ''} key={id} to={to}>
                        <Heading isHeading className='text-base font-medium z-[9]'>{title}</Heading></NavLink>
                ))}
            </div>
        </>
    );
};

export default Navbar;