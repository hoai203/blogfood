import React, { useEffect, useState } from "react";
import ModalBase from "../../modal/ModalBase";
import LayoutAdminModel from "../LayoutAdminModel";
import {
    Card, CardBody, CardHeader, CardFooter, Avatar, Typography, Button,
} from "@material-tailwind/react";
import {
    NewspaperIcon, HeartIcon
} from "@heroicons/react/24/outline";
import { icon } from "../../../ADMIN/routes";

import { useDispatch, useSelector } from "react-redux";
import { postDetailAdminSuccess, updateStatusRequest } from "../../../sagas/admin/adminSlice";
import { WrapInfo } from "../../../pages/InfoUser";
import { EmailIcon, LocationIcon, UserIcon } from "../../../components/Icon";
import { closeDetailCustomer, toggleDetaiPost, toggleUpdateCustomer } from "../../../sagas/global/globalSlice";
import SpeedDialAdmin from "../SpeedDialAdmin";
import PostItemAdmin from "../PostItemAdmin";

const CustomerDetailAdmin = () => {
    const dispatch = useDispatch();
    const [totalLike, setTotalLike] = useState(0);
    const { showDetailCustomer } = useSelector((state) => state.global)
    const handleEditCustomer = () => {
        dispatch(toggleUpdateCustomer());
    };
    const handleClose = () => {
        dispatch(closeDetailCustomer())
    }
    const { posts, customerDetail } = useSelector((state) => state.admin);

    const dataPostsByCustomer = posts.filter(
        (post) => post.id_customer === customerDetail?._id
    );


    const handleUpdateStatus = (status) => {
        const model = "customer";
        const id = customerDetail?._id;
        dispatch(updateStatusRequest({ id, model, status }));
        handleClose();
    };
    useEffect(() => {
        if (dataPostsByCustomer) {
            let total = 0;
            dataPostsByCustomer.forEach(post => {
                const likePost = post.likes?.length || 0;
                total += likePost;
            });
            setTotalLike(total);
        }
    }, [dataPostsByCustomer]);
    return (
        <>
            <ModalBase onClose={handleClose} visible={showDetailCustomer}>
                <LayoutAdminModel onClick={handleClose}>
                    <div
                        className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-cover	bg-center"
                        style={{ backgroundImage: `url(${customerDetail?.image})` }}
                    >
                        <div className="absolute inset-0 h-full w-full bg-gray-500/50" />
                    </div>
                    <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
                        <CardBody className="p-4">
                            <div className="mb-1 flex items-center justify-between gap-6">
                                <div className="flex items-center gap-6">
                                    <Avatar
                                        src={customerDetail?.image}
                                        alt="bruce-mars"
                                        size="xl"
                                        className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                                    />
                                    <div>
                                        <Typography variant="h5" color="blue-gray" className="mb-1">
                                            {customerDetail?.full_name || ''}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            className="font-normal text-blue-gray-600"
                                        >
                                            {customerDetail?.user_name || ''}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div className=' flex-auto h-auto bg-white rounded-xl p-5 flex gap-x-10 flex-col md:flex-row md:gap-y-10'>
                                <div className='text-xs md:text-sm flex-1'>
                                    <WrapInfo>
                                        <UserIcon /> <p>{customerDetail?.full_name}</p>
                                    </WrapInfo>
                                    <WrapInfo>
                                        <EmailIcon /> <p className='w-[80%]'>{customerDetail?.email || 'Chưa có'}</p>
                                    </WrapInfo>
                                    <WrapInfo>
                                        <LocationIcon /> <p>{customerDetail?.address || 'Chưa có'}</p>
                                    </WrapInfo>
                                </div>
                                <div className='text-xs md:text-sm flex-1'>
                                    <WrapInfo>
                                        <NewspaperIcon {...icon} /><p>{dataPostsByCustomer?.length} bài viết</p>
                                    </WrapInfo>
                                    <WrapInfo>
                                        <HeartIcon {...icon} /> <p className='w-[80%]'>{totalLike} lượt thích</p>
                                    </WrapInfo>
                                </div>
                            </div>
                            <div className="px-4 pb-4">
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Bài viết của người dùng
                                </Typography>
                                <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
                                    {dataPostsByCustomer?.length > 0 ? dataPostsByCustomer?.map((post) => (
                                        <PostItemAdmin key={post?._id} post={post} />
                                    )) : <span className="col-span-1 text-center md:col-span-2 xl:col-span-3">
                                        Không có bài viết nào!</span>}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <SpeedDialAdmin
                        detail={customerDetail} handleEdit={handleEditCustomer} handleUpdateStatus={handleUpdateStatus} idEntity={customerDetail?._id} />
                </LayoutAdminModel>
            </ModalBase>
            {/* <PostEditAdmin
    data={data}
    show={toggle}
    onClick={handleToggle}
  ></PostEditAdmin> */}
        </>
    );
};

export default CustomerDetailAdmin;
