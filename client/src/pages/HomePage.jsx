import React, { useEffect } from 'react';
import Section from '../layout/common/Section';
import { Heading } from '../components/heading';
import ListSlide from '../layout/slide/ListSlide';
import ListPostHome from '../layout/posts/ListPostHome';
import ListPost from '../layout/posts/ListPost';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../layout/Banner';
import LoadingRequest from '../layout/loading/LoadingRequest';
import { postsRequest } from '../sagas/posts/postsSlice';
import { Link } from 'react-router-dom';
import useSetTitle from '../hooks/useSetTitle';

const HomePage = () => {// Gửi dữ liệu đến server
    useSetTitle('Trang chủ')
    const { posts, loading } = useSelector((state) => state.posts)
    const { categories } = useSelector((state) => state.categories);
    const { customers } = useSelector((state) => state.customers);
    const post = [...posts]
    post.sort((a, b) => a.timestamps - b.timestamps)
    const dispatch = useDispatch()

    const { token } = useSelector((state) => state.auth);
    const tokenLocal = localStorage.getItem('authToken')
    useEffect(() => {
        dispatch(postsRequest())
    }, [token, dispatch, tokenLocal]);

    return (
        <div>
            <LoadingRequest show={loading}></LoadingRequest>
            <Section className='mb-10'>
                <Banner></Banner>
            </Section>
            <Heading isHeading className='mb-10 mx-2 text-center'>
                - Danh mục  -
            </Heading>
            <Section className=' bg-[#f7f7f7] mb-48 relative'>
                <div className='w-full h-auto bg-[#f7f7f7] bg-fixed p-2 md:p-10 bg-cover relative'
                    style={{ backgroundImage: 'url(./src/assets/image/banner4.jpg)' }}>
                    <div className='bg-black opacity-80 inset-0 absolute'></div>
                    <div className='page-content my-28 mt-10'>
                        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 gap-y-10 md:gap-10 mb-14 '>
                            {categories?.length > 0 && categories?.slice(0, 4).map(item => (
                                <Link to={`/categories/${item?.slug}`} key={item._id} className='h-[300px] shadow-2xl md:h-[394px] relative rounded-md'>
                                    <img lazy-src={item?.image} alt="" className='w-full h-full object-cover rounded-md' />
                                    <div className='absolute bottom-0 translate-y-1/2 w-auto min-w-[80%]  
                                    rounded-md px-2 py-1 left-1/2 -translate-x-2/4 bg-primary text-white
                                    font-medium text-center text-xs md:text-base'>{item?.title}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <Section className=' page-content absolute -bottom-14 left-1/2 -translate-x-1/2 translate-y-1/2'>
                    <ListSlide className={'text-black'} data={categories?.slice(3)}></ListSlide>
                </Section>
            </Section>
            <div className='lg:px-0'>
                <Heading isHeading className='mb-10 mx-2 text-center'>
                    - Bài viết mới nhất -
                </Heading>
                <Section className='page- '>
                    <ListPostHome data={post?.slice(0, 10)} isHome></ListPostHome>
                </Section>
                <Heading isHeading className='mb-10 mx-2 text-center'>
                    - Người dùng nỗi bật -
                </Heading>
                <Section className='bg-[#f7f7f7] py-10'>
                    <div className='page-content'>
                        <ListSlide isCustomer={true} className={'text-black page-content'} data={customers}></ListSlide>
                    </div>
                </Section>
                <Section className='page-content '>
                    <Heading isHeading className='mb-10 mx-2 text-center'>
                        - Bài viết -
                    </Heading>
                    <ListPost data={post?.slice(10)}></ListPost>
                </Section>
            </div>
        </div>
    );
};

export default HomePage;
