import React, { useEffect } from 'react';
import ListPost from '../layout/posts/ListPost';
import { useDispatch, useSelector } from 'react-redux';
import BannerCommon from '../layout/common/BannerCommon';
import _ from 'lodash';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingRequest from '../layout/loading/LoadingRequest';
import { categoriesRequest, detailCategoriesRequest } from '../sagas/categories/categoriesSlice';
import useSetTitle from '../hooks/useSetTitle';
import { setBreadcrumb } from '../sagas/global/globalSlice';


const ListPostsByCategory = () => {
    const dispatch = useDispatch()
    const { slug } = useParams()
    const navigate = useNavigate();

    const { posts, loading } = useSelector((state) => state.posts)
    const { categories, detailCategory, error, loading: loadingCate } = useSelector((state) => state.categories)
    // const dataCategory = categories?.filter((cate) => cate?.slug === slug)[0];
    const listPosts = posts?.filter((post) => post?.category === detailCategory?._id)
    useEffect(() => {
        dispatch(categoriesRequest())
        dispatch(detailCategoriesRequest({ slug }))
    }, []);
    useEffect(() => {
        if (!loadingCate && error?.message) {
            navigate('/not-found')
        }
    }, [loadingCate, error]);
    useSetTitle(detailCategory?.title || 'Danh sách bài viết theo loại')
    useEffect(() => {
        dispatch(setBreadcrumb(detailCategory?.title))
    }, [detailCategory]);
    return (
        <>
            <LoadingRequest show={loading}></LoadingRequest>
            <BannerCommon image={detailCategory?.image || '../src/assets/image/banner-post.jpg'} title='Danh Sách Bài Viết' />
            <div className='page-content'>
                <div className='my-10'>
                    <ListPost message={'Không có dữ liệu!'} data={listPosts}></ListPost>
                </div>
            </div>
        </>
    );
};

export default ListPostsByCategory;