import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash'
import { Link, useLocation } from 'react-router-dom';
// import { searchPostsRequest } from '../sagas/posts/postsSlice';
// import Loading from './loading/Loading';
import { closeSearchAdmin } from '../../sagas/global/globalSlice';
import ModalBase from '../modal/ModalBase';
import { SearchIcon } from '../../components/Icon';
import { Heading } from '../../components/heading';
import { searchAdminRequest, searchCategoriesRequest, searchCustomersRequest, searchPostsRequest } from '../../sagas/admin/adminSlice';
import Loading from '../loading/Loading';
import WrapListSearch from '../WrapListSearch';

const SearchAdmin = () => {
    const dispatch = useDispatch()
    const location = useLocation();

    const { searchPosts, searchCategories, searchAdmins, searchCustomers, loading } = useSelector((state) => state.admin)
    const { showSearchAdmin } = useSelector((state) => state.global)
    const handleClose = () => {
        dispatch(closeSearchAdmin())
    }
    const [query, setQuery] = useState('');
    const handleOnChange = _.debounce((e) => {
        const value = e.target.value
        if (value) {
            setQuery(e.target.value)
        } else {
            setQuery('')
        }
    }, 1000)
    useEffect(() => {
        if (query) {
            dispatch(searchAdminRequest({ key: query, model: 'admin' }))
            dispatch(searchCategoriesRequest({ key: query, model: 'category' }))
            dispatch(searchCustomersRequest({ key: query, model: 'customer' }))
            dispatch(searchPostsRequest({ key: query, model: 'post' }))
        }
    }, [query]);
    useEffect(() => {
        setQuery('')
    }, [location.pathname]);
    return (
        <ModalBase onClose={handleClose} visible={showSearchAdmin}>
            <div className={`flex-1 fixed bg-white-cream bg-opacity-90 flex w-full justify-center gap-5 
            transition-all backdrop-blur text-black
                left-0 flex-col px-5 py-5 text-sm z-[99] shadow-soft border-t border-primary bad
                ${showSearchAdmin ? 'top-0' : 'invisible -top-[500px]'}`} >
                <div className='absolute top-2 right-2 text-2xl text-primary cursor-pointer'
                    onClick={handleClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <div className='page-content'>
                    <Input variant="standard" className='mb-5' label={'Nhập nội dung tìm kiếm'}
                        onChange={handleOnChange} icon={<SearchIcon />}></Input>
                    <div className='flex flex-col overflow-y-auto max-h-[500px] overscroll-none'>
                        {loading && <Loading />}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5'>
                            {!loading && query && searchAdmins?.length > 0 && (
                                <WrapListSearch title={'Quản trị viên'}>
                                    {
                                        searchAdmins?.slice(0, 5).map((item) => (
                                            <SearchItem key={item._id} id={item._id} image={item.image}
                                                name={item.full_name}
                                                type={'admin'}></SearchItem>
                                        ))}
                                </WrapListSearch>
                            )}
                            {!loading && query && searchCustomers?.length > 0 && (
                                <WrapListSearch title={'Người dùng'}>
                                    {!loading && query &&
                                        searchCustomers?.slice(0, 5).map((item) => (
                                            <SearchItem key={item._id} id={item._id} image={item.image}
                                                name={item.full_name}
                                                type={'customer'}></SearchItem>
                                        ))}
                                </WrapListSearch>
                            )}
                            {!loading && query && searchCategories?.length > 0 && (
                                <WrapListSearch title={'Chủ đề bài viết'}>
                                    {!loading && query &&
                                        searchCategories?.slice(0, 5).map((item) => (
                                            <SearchItem key={item._id} id={item._id} image={item.image}
                                                name={item.title}
                                                type={'category'}></SearchItem>
                                        ))}
                                </WrapListSearch>
                            )}
                            {!loading && query && searchPosts?.length > 0 && (
                                <WrapListSearch title={'Bài viết'}>
                                    {!loading && query &&
                                        searchPosts?.slice(0, 5).map((item) => (
                                            <SearchItem key={item._id} id={item._id} image={item.image}
                                                name={item.title}
                                                type={'post'}></SearchItem>
                                        ))}
                                </WrapListSearch>
                            )}
                        </div>
                        {searchAdmins?.length < 1 &&
                            searchCategories?.length < 1 &&
                            searchPosts?.length < 1 &&
                            searchCustomers?.length < 1 &&
                            <span className='text-center my-4'>Không có dữ liệu</span>
                        }
                    </div>
                </div>
            </div>
        </ModalBase>
    );
};
const SearchItem = ({ id, image, name, type }) => {
    let toLink = ''
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(closeSearchAdmin())
    }
    switch (type) {
        case 'admin':
            toLink = `/admin/manage#id_admin=${id}`
            break;
        case 'customer':
            toLink = `/admin/customers#id_customer=${id}`
            break;
        case 'post':
            toLink = `/admin/posts#id_post=${id}`
            break;
        case 'category':
            toLink = `/admin/categories#id_category=${id}`
            break;
        default:
            break;
    }
    return (
        <Link to={toLink} className='flex gap-3 items-center border-b py-2 border-primary border-opacity-10 last:border-b-0' onClick={handleClose}>
            <div className=' w-14 h-14 overflow-hidden rounded-md '>
                <img src={image} alt={name}
                    className={`w-full h-full object-cover ${type === 'customer' || type === 'admin' ? 'rounded-full' : ''}`} />
            </div>
            <div className='flex-1'>
                <Heading className='text-xs md:text-sm'>
                    {name}</Heading>
            </div>
        </Link>
    )
}


export default SearchAdmin;