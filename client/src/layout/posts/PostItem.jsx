/* eslint-disable react/no-unknown-property */
import { Link } from "react-router-dom"
import { Heading } from "../../components/heading"
import DataPost from "./DataPost"
import { useDispatch, useSelector } from "react-redux"
import FileIcon from "../../components/Icon/FileIcon"
import { useEffect } from "react"
import {
    ArchiveBoxXMarkIcon,
    ArrowUpTrayIcon,
    PencilSquareIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";
import { icon } from "../../ADMIN/routes"
import { toggleEditPostCustomer } from "../../sagas/global/globalSlice"
import { getDetailPostSuccess } from "../../sagas/posts/postsSlice"
import { deleteAdminRequest } from "../../sagas/admin/adminSlice"
import useToggle from "../../hooks/useToggle"
import { DiaLog } from "../DiaLog"
const PostItem = ({ data = {}, isSingle, isInfo = false }) => {
    const dispatch = useDispatch()
    const { comments } = useSelector((state) => state.comments);
    const { infoAuth } = useSelector((state) => state.auth);
    const { categories } = useSelector((state) => state.categories);
    const dataCategory = categories.filter((cate) => cate._id === data?.category)[0]
    const commentByPosts = comments.filter((comment) => comment?.id_post === data?._id);
    const { handleToggle, handleToggleFalse, toggle } = useToggle(false)
    const handleToggleEditPost = () => {
        dispatch(getDetailPostSuccess(data))
        dispatch(toggleEditPostCustomer())
    }
    const handleDeletePost = () => {
        dispatch(deleteAdminRequest({ id: data?._id, id_customer: data?.id_customer }))
    }
    useEffect(() => {
        const divElements = document.querySelectorAll('.content_post.post_item div');
        const pElements = document.querySelectorAll('.content_post.post_item p');
        divElements?.forEach(div => {
            if (div.textContent.trim() === '')
                div.style.display = 'none';
        });
        pElements?.forEach(p => {
            if (p.textContent.trim() === '')
                p.style.display = 'none';
        });
    }, []);
    const isApproved = data?.status === 'approved'
    const isAuthenPost = data?.id_customer === infoAuth?._id
    const className = 'p-4 rounded-full flex items-center justify-center text-white cursor-pointer'
    return (
        <div className={`overflow-hidden relative col-span-2 flex flex-col md:flex-row group  h-full pb-0 gap-
            ${isSingle
                ? 'md:flex-col !col-span-1 gap-5'
                : 'md:even:flex-row-reverse'} ${data?.status !== 'approved' && 'select-none'}
        `}>
            {!isApproved && <div className="absolute inset-0 bg-white bg-opacity-50 z-[6] flex items-center justify-center"></div>}
            <DiaLog open={toggle} handleOpen={handleToggle} header='Bạn có muốn xóa bài viết này không!' title='Bài viết đã xóa sẽ không thể khôi phục' onClick={handleDeletePost}></DiaLog>
            {isInfo && isAuthenPost &&
                <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100  
                transition-all inset-0 bg-white bg-opacity-50 z-[6] flex items-center justify-center">
                    <div className=" transition-all flex items-center justify-center gap-0 group-hover:gap-x-10">
                        <div onClick={handleToggleEditPost} className={`${className} bg-green-400`}>
                            <PencilSquareIcon  {...icon} />
                        </div>
                        <Link to={`/detail/${data?.slug}`} className={`${className} ${isApproved ? 'block' : 'hidden'} bg-blue-400`}>
                            <EyeIcon {...icon} />
                        </Link>
                        <div onClick={handleToggle} className={`${className} bg-red-400`}>
                            <ArchiveBoxXMarkIcon {...icon} />
                        </div>
                    </div>
                </div>
            }
            <Link to={`/detail/${data.slug}`}
                className={`w-full overflow-hidden h-full max-h-[350px] bg-primary bg-opacity-25
                    ${isSingle
                        ? 'lg:max-w-full md:max-h-[190px] min-h-[190px] '
                        : 'lg:min-h-[350px] md:min-h-[270px] min-h-[200px]'}`}>
                <img lazy-src={data?.image} className=' w-full h-full object-cover
                group-hover:scale-105 transition-all duration-500'/>
            </Link>
            <div className={` flex justify-center w-full md:h-full 
                ${isSingle
                    ? ''
                    : '  bg-primary !bg-opacity-80 '} `}>
                <div className={`flex flex-col  w-full gap-y-3   
                    ${isSingle
                        ? 'flex-1 h-full lg:p-2 '
                        : 'justify-center items-center py-5 lg:px-5 md:px-4  '}`}>
                    <Link to={`/categories/${dataCategory?.slug}`}
                        className={`flex gap-x-2 text-primary font-medium 
                    ${isSingle
                                ? 'mb-auto'
                                : 'text-white '}`}><FileIcon />
                        <p className="text-[11px] uppercase lg:text-sm ">{dataCategory?.title}</p>
                    </Link>
                    <div className={`flex flex-col gap-y-2  lg:gap-y-5 ${isSingle ? 'h-full ' : ''}`}>
                        <Link className="" to={`/detail/${data.slug} `}>
                            <Heading className={`text-base leading-5 font-medium text-inherit 
                            ${isSingle
                                    ? 'text-primary'
                                    : 'lg:text-xl uppercase text-white text-center'}
                                    `}>
                                {data.title}
                            </Heading>
                        </Link>
                        <div className={`!bg-none ${isSingle
                            ? " line-clamp-4 lg:line-clamp-3 md:mt-auto"
                            : 'hidden'}`}>
                            <div dangerouslySetInnerHTML={{ __html: data?.content }}
                                className='content_post post_item !font-normal !text-gray-200 ' />
                        </div>
                    </div>
                    <DataPost className={isSingle ? 'mt-auto' : 'hidden'} timestamps={data?.timestamps}
                        comments={commentByPosts?.length}
                        likes={data?.likes}></DataPost>

                </div>
            </div>
        </div>
    )
}
export default PostItem