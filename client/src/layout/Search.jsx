import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Heading } from '../components/heading';
import { SearchIcon } from '../components/Icon';
import { Input } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash'
import { Link, useLocation } from 'react-router-dom';
import Loading from './loading/Loading';
import { closeSearch } from '../sagas/global/globalSlice';
import ModalBase from './modal/ModalBase';
import { searchCategoriesRequest, searchCustomersRequest, searchPostsRequest } from '../sagas/customers/customersSlice';
import WrapListSearch from './WrapListSearch';

const Search = () => {
    const dispatch = useDispatch()
    const location = useLocation();

    const { customers_search, posts_search, categories_search, loading } = useSelector((state) => state.customers)
    const { showSearch } = useSelector((state) => state.global)
    const handleClose = () => {
        dispatch(closeSearch())
    }
    const [query, setQuery] = useState(null);
    const handleOnChange = _.debounce((e) => {
        setQuery(e.target.value)
    }, 1000)
    useEffect(() => {
        if (query) {
            dispatch(searchCategoriesRequest({ key: query, model: 'category' }))
            dispatch(searchCustomersRequest({ key: query, model: 'customer' }))
            dispatch(searchPostsRequest({ key: query, model: 'post' }))
        }
    }, [query]);
    useEffect(() => {
        setQuery('')
    }, [location.pathname]);
    return (
        <ModalBase onClose={handleClose} visible={showSearch}>
            <div className={`flex-1 fixed bg-white-cream bg-opacity-90 flex w-full justify-center gap-5 
        transition-all backdrop-blur text-black
            left-0 flex-col px-5 py-5 text-sm z-[99] shadow-soft border-t border-primary bad
            ${showSearch ? 'top-0' : 'invisible -top-[500px]'}`} >
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
                            {!loading && query && customers_search?.length > 0 && (
                                <WrapListSearch title={'Người dùng'}>
                                    {!loading && query &&
                                        customers_search?.slice(0, 5).map((item) => (
                                            <SearchItem key={item._id} slug={item.slug} image={item.image}
                                                name={item.full_name}
                                                type={'customer'}></SearchItem>
                                        ))}
                                </WrapListSearch>
                            )}
                            {!loading && query && categories_search?.length > 0 && (
                                <WrapListSearch title={'Danh mục bài viết'}>
                                    {!loading && query &&
                                        categories_search?.slice(0, 5).map((item) => (
                                            <SearchItem key={item._id} slug={item.slug} image={item.image}
                                                name={item.title}
                                                type={'category'}></SearchItem>
                                        ))}
                                </WrapListSearch>
                            )}
                            {!loading && query && posts_search?.length > 0 && (
                                <WrapListSearch title={'Bài viết'}>
                                    {!loading && query &&
                                        posts_search?.slice(0, 5).map((item) => (
                                            <SearchItem key={item._id} slug={item.slug} image={item.image}
                                                name={item.title}
                                                type={'post'}></SearchItem>
                                        ))}
                                </WrapListSearch>
                            )}
                        </div>
                        {
                            categories_search?.length < 1 &&
                            posts_search?.length < 1 &&
                            customers_search?.length < 1 &&
                            <span className='text-center my-4'>Không có dữ liệu</span>
                        }
                    </div>
                </div>
            </div>
        </ModalBase>
    );
};
const SearchItem = ({ slug, image, name, type }) => {
    let toLink = ''
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(closeSearch())
    }
    switch (type) {
        case 'customer':
            toLink = `/info/${slug}`
            break;
        case 'post':
            toLink = `/detail/${slug}`
            break;
        case 'category':
            toLink = `/categories/${slug}`
            break;
        default:
            break;
    }
    return (
        <Link to={toLink} className='flex gap-3 items-center border-b py-2 border-primary border-opacity-10 last:border-b-0' onClick={handleClose}>
            <div className=' w-14 h-14 overflow-hidden rounded-md '>
                <img src={image}
                    className={`w-full h-full object-cover ${type === 'customer' ? 'rounded-full' : ''}`} />
            </div>
            <div className='flex-1'>
                <Heading className='text-xs md:text-sm'>
                    {name}</Heading>
            </div>
        </Link>
    )
}


export default Search;