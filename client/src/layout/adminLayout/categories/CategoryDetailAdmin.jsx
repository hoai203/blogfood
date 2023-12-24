import React from "react";
import ModalBase from "../../modal/ModalBase";
import LayoutAdminModel from "../LayoutAdminModel";
import {
  Card, CardBody, CardHeader, CardFooter, Avatar, Typography, Button,
} from "@material-tailwind/react";

import { useDispatch, useSelector } from "react-redux";
import { postDetailAdminSuccess, updateStatusRequest } from "../../../sagas/admin/adminSlice";
import { closeDetailCategory, toggleDetaiPost, toggleUpdateCategory } from "../../../sagas/global/globalSlice";
import SpeedDialAdmin from "../SpeedDialAdmin";
import PostItemAdmin from "../PostItemAdmin";
const CategoryDetailAdmin = () => {
  const dispatch = useDispatch();
  const { posts, admin, categoryDetail } = useSelector((state) => state.admin);
  const dataAdmin = admin.filter((ad) => ad._id === categoryDetail?.id_author)[0];

  const dataPostsByCategory = posts.filter(
    (post) => post.category === categoryDetail?._id
  );
  const { showDetailCategory } = useSelector((state) => state.global)
  const handleEditCategory = () => {
    dispatch(toggleUpdateCategory());
  };
  const handleClose = () => {
    dispatch(closeDetailCategory())
  }
  const handleShowDetailPost = (data) => {
    dispatch(postDetailAdminSuccess(data));
    dispatch(toggleDetaiPost());
  }
  const handleUpdateStatus = (status) => {
    const model = "category";
    const id = categoryDetail?._id;
    dispatch(updateStatusRequest({ id, model, status }));
    handleClose();
  };
  return (
    <ModalBase onClose={handleClose} visible={showDetailCategory}>
      <LayoutAdminModel onClick={handleClose}>
        <div
          className="relative w-full mt- overflow-hidden bg-center bg-cover h-72 rounded-xl"
          style={{ backgroundImage: `url(${categoryDetail?.image})` }}
        >
          <div className="absolute inset-0 w-full h-full bg-gray-500/50" />
        </div>
        <Card className="mx-3 mb-6 -mt-16 lg:mx-4">
          <CardBody className="p-4">
            <div className="flex items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-6">
                <Avatar
                  src={categoryDetail?.image}
                  alt="bruce-mars"
                  size="xl"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1 text-base md:text-lg">
                    {categoryDetail?.title || ''}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600 text-xs md:text-sm"
                  >
                    {dataAdmin?.full_name} - {categoryDetail?.date}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Danh sách bài viết
              </Typography>
              <div className="grid grid-cols-1 gap-12 mt-6 md:grid-cols-2 xl:grid-cols-3">
                {dataPostsByCategory?.length > 0 ? dataPostsByCategory?.map((post) => (
                  <PostItemAdmin key={post?._id} post={post} />
                )) : <span className="col-span-1 text-center md:col-span-2 xl:col-span-3">Không có bài viết nào!</span>}
              </div>
            </div>
          </CardBody>
        </Card>
        <SpeedDialAdmin
          detail={categoryDetail} handleEdit={handleEditCategory} handleUpdateStatus={handleUpdateStatus} />
      </LayoutAdminModel>
    </ModalBase>
  );
};

export default CategoryDetailAdmin;
