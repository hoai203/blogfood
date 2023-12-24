import React, { useEffect, useState } from 'react';
import ListPost from '../layout/posts/ListPost';
import { useDispatch, useSelector } from 'react-redux';
import BannerCommon from '../layout/common/BannerCommon';
import _ from 'lodash';
import { searchPostsRequest } from '../sagas/posts/postsSlice';
import { useLocation } from 'react-router-dom';
import LoadingRequest from '../layout/loading/LoadingRequest';
import { SearchIcon } from '../components/Icon';
import { Input } from '@material-tailwind/react';
import useSetTitle from '../hooks/useSetTitle';
import useLoadingImage from '../hooks/useLoadingImage';


const PostPage = () => {
    useSetTitle('Danh sách bài viết')
    const dispatch = useDispatch()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search).get("query");
    const { search_posts, loading } = useSelector((state) => state.posts)
    const [query, setQuery] = useState('');
    const handleOnChange = _.debounce((e) => {
        setQuery(e.target.value)
    }, 1000)
    useEffect(() => {
        dispatch(searchPostsRequest({ query }))
    }, [query, searchParams]);
    useEffect(() => {
        setQuery(searchParams || '')
    }, [searchParams]);
    useLoadingImage(search_posts)
    return (
        <>
            <LoadingRequest show={loading}></LoadingRequest>
            <BannerCommon image={'./src/assets/image/banner-post.jpg'} title='Danh Sách Bài Viết' />
            <div className='page-content'>
                <div className='my-10'>
                    <div className='mb-10 mx-2'>
                        <Input variant="standard" defaultValue={query} label={'Nhập nội dung tìm kiếm'}
                            onChange={handleOnChange}
                            icon={<SearchIcon />}></Input>
                    </div>
                    <ListPost message={'Không có dữ liệu!'} data={search_posts}></ListPost>
                </div>
            </div>
        </>
    );
};

export default PostPage;