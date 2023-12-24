import React, { useEffect, useState } from "react";
import ModalBase from "../../modal/ModalBase";
import LayoutAdminModel from "../LayoutAdminModel";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  NewspaperIcon,
  HeartIcon,
  ShieldCheckIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { icon } from "../../../ADMIN/routes";

import { useDispatch, useSelector } from "react-redux";
import {
  postDetailAdminSuccess,
  updateRoleAdminRequest,
  updateStatusRequest,
} from "../../../sagas/admin/adminSlice";
import { WrapInfo } from "../../../pages/InfoUser";
import { EmailIcon, LocationIcon, UserIcon } from "../../../components/Icon";
import {
  closeDetailAdmin,
  toggleDetaiPost,
  toggleUpdateAdmin,
} from "../../../sagas/global/globalSlice";
import SpeedDialAdmin from "../SpeedDialAdmin";
import { PopoverDrop } from "../../Popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import PostItemAdmin from "../PostItemAdmin";

const DetailAdmin = () => {
  const dispatch = useDispatch();
  const [totalLike, setTotalLike] = useState(0);
  const { showDetailAdmin } = useSelector((state) => state.global);
  const handleEditAdmin = () => {
    dispatch(toggleUpdateAdmin());
  };
  const handleClose = () => {
    dispatch(closeDetailAdmin());
  };
  const { posts, adminDetail, role, infoAdmin } = useSelector(
    (state) => state.admin
  );
  const handleShowDetailPost = (data) => {
    dispatch(postDetailAdminSuccess(data));
    dispatch(toggleDetaiPost());
  }
  const dataPostsByAdmin = posts?.filter(
    (post) => post.id_customer === adminDetail?._id
  );

  const typeRole = role?.filter((r) => r._id === adminDetail?.role)[0];
  const handleUpdateStatus = (status) => {
    const model = "admin";
    const id = adminDetail?._id;
    dispatch(updateStatusRequest({ id, model, status }));
    handleClose();
  };
  const handleUpdateRole = (idRole) => {
    const role = { role: idRole };
    dispatch(updateRoleAdminRequest({ role, id: adminDetail?._id }));
    handleClose();
  };
  useEffect(() => {
    if (dataPostsByAdmin) {
      let total = 0;
      dataPostsByAdmin.forEach((post) => {
        const likePost = post.likes?.length || 0;
        total += likePost;
      });
      setTotalLike(total);
    }
  }, [dataPostsByAdmin]);
  return (
    <>
      <ModalBase onClose={handleClose} visible={showDetailAdmin}>
        <LayoutAdminModel onClick={handleClose}>
          <div
            className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-cover	bg-center"
            style={{ backgroundImage: `url(${adminDetail?.image})` }}
          >
            <div className="absolute inset-0 h-full w-full bg-gray-500/50" />
          </div>
          <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
            <CardBody className="p-4">
              <div className="mb-1 flex items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <Avatar
                    src={adminDetail?.image}
                    alt="bruce-mars"
                    size="xl"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {adminDetail?.full_name || ""}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                    >
                      {adminDetail?.user_name || ""}
                    </Typography>
                  </div>
                </div>
              </div>
              <div
                className=" flex-auto h-auto bg-white rounded-xl p-5 flex gap-x-10 flex-col md:flex-row
                gap-y-0 md:gap-y-10">
                <div className="text-xs md:text-sm flex-1">
                  <WrapInfo>
                    <UserIcon /> <p>{adminDetail?.full_name}</p>
                  </WrapInfo>
                  <WrapInfo>
                    <EmailIcon />{" "}
                    <p className="w-[80%]">{adminDetail?.email || "Chưa có"}</p>
                  </WrapInfo>
                  <WrapInfo>
                    <LocationIcon /> <p>{adminDetail?.address || "Chưa có"}</p>
                  </WrapInfo>
                </div>
                <div className="text-xs md:text-sm flex-1">
                  <WrapInfo>
                    <ShieldCheckIcon {...icon} />
                    <div className="flex gap-4 items-center">
                      <Typography
                        className={`text-xs flex items-center gap-x-2 font-semibold 
                        text-blue-600 min-w-[60px] ${typeRole?.title === "Admin"
                            ? "text-primary"
                            : ""}
                          ${adminDetail?.boss &&
                          "text-red-500"}`}
                      >
                        {typeRole?.title === "Admin"
                          ? "Quản Trị viên"
                          : "Nhân viên" || ""}
                        {adminDetail?.boss && (
                          <FontAwesomeIcon icon={faCrown} />
                        )}
                      </Typography>
                      {infoAdmin?.boss &&
                        infoAdmin?._id !== adminDetail?._id && (
                          <PopoverDrop
                            x={80}
                            icon={<PencilSquareIcon {...icon} />}
                          >
                            <div className="flex items-center gap-5">
                              {role?.map((ro) => (
                                <div
                                  key={ro._id}
                                  onClick={() => {
                                    handleUpdateRole(ro._id);
                                  }}
                                  className="flex items-center cursor-pointer"
                                >
                                  {ro.title === "Staff"
                                    ? "Nhân viên"
                                    : "Quản trị viên"}
                                </div>
                              ))}
                            </div>
                          </PopoverDrop>
                        )}
                    </div>
                  </WrapInfo>
                  <WrapInfo>
                    <NewspaperIcon {...icon} />
                    <p>{dataPostsByAdmin?.length} bài viết</p>
                  </WrapInfo>
                  <WrapInfo>
                    <HeartIcon {...icon} />{" "}
                    <p className="w-[80%]">{totalLike} lượt thích</p>
                  </WrapInfo>
                </div>
              </div>
              <div className="px-4 pb-4">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Bài viết của người dùng
                </Typography>
                <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
                  {dataPostsByAdmin?.length > 0 ? dataPostsByAdmin?.map((post) => (
                    <PostItemAdmin key={post?._id} post={post} />
                  )) : <span className="col-span-1 text-center md:col-span-2 xl:col-span-3">
                    Không có bài viết nào!</span>}
                </div>
              </div>
            </CardBody>
          </Card>
          <SpeedDialAdmin
            detail={adminDetail}
            handleEdit={handleEditAdmin}
            handleUpdateStatus={handleUpdateStatus}
            idEntity={adminDetail?._id}
          />
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

export default DetailAdmin;
