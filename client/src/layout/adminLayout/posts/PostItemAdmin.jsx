import { EyeIcon } from "@heroicons/react/24/outline";
import { Avatar, Chip, Typography } from "@material-tailwind/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { icon } from "../../../ADMIN/routes";
import useTimeSince from "../../../hooks/useTimeSince";
import {
  customerDetailAdminSuccess,
  detailCategoriesAdminSuccess,
  postDetailAdminSuccess,
} from "../../../sagas/admin/adminSlice";
import { toggleDetaiPost } from "../../../sagas/global/globalSlice";

const PostItemAdmin = ({ data }) => {
  const className = "px-5 py-3";
  const { admin, customers, categories } = useSelector((state) => state.admin);
  const timeSince = useTimeSince();
  const dispatch = useDispatch();
  const dataCategory = categories.filter(
    (cate) => cate._id === data?.category
  )[0];
  const dataCustomer = customers.filter(
    (cus) => cus._id === data?.id_customer
  )[0];
  const dataAdmin = admin.filter((ad) => ad._id === data?.id_customer)[0];
  const authorType = data?.authorType;
  const dataAuthor = dataCustomer || dataAdmin;

  function handleShowPostDetail() {
    dispatch(toggleDetaiPost());
    dispatch(postDetailAdminSuccess({ ...data }));
    dispatch(customerDetailAdminSuccess({ ...dataAuthor }));
    dispatch(detailCategoriesAdminSuccess({ ...dataCategory }));
  }
  return (
    <tr className="border-b border-blue-gray-50 last:border-b-0" id={data?._id}>
      <td className={`${className} max-w-[500px]`}>
        <div className="flex items-center gap-4">
          <Avatar className='bg-primary bg-opacity-5' lazy-src={data?.image} size="lg" />
          <div className="flex-1">
            <Typography className="text-xs font-normal text-blue-gray-500">
              {dataCategory?.title || ""}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold"
            >
              {data?.title}
            </Typography>
          </div>
        </div>
      </td>
      <td className={className}>
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {(authorType === "customer"
            ? dataCustomer?.full_name
            : authorType === "admin"
              ? dataAdmin?.full_name
              : "") || ""}
        </Typography>
        <Typography className="text-xs font-normal text-blue-gray-500">
          {(authorType === "customer"
            ? dataCustomer?.user_name
            : authorType === "admin"
              ? `${dataAdmin?.user_name} (${authorType})`
              : "") || ""}
        </Typography>
      </td>
      <td className={`${className} `}>
        <Chip
          variant="gradient"
          color={
            data?.status === "approved"
              ? "green"
              : data?.status === "pending"
                ? "yellow"
                : "red"
          }
          value={
            data?.status === "approved"
              ? "Đã duyệt"
              : data?.status === "pending"
                ? "Chờ duyệt"
                : "vô hiệu hóa"
          }
          className="py-0.5 px-2 text-[11px] font-medium inline-block"
        />
      </td>
      <td className={className}>
        <Typography className="flex flex-col text-xs font-semibold text-blue-gray-600">
          <span>{data?.date || ""}</span>
          <span className="font-normal text-gray-500">
            ({timeSince(data?.timestamps || Date.now())})
          </span>
        </Typography>
      </td>
      <td
        className={`${className} sticky right-0 bg-white shadow-inner md:shadow-none`}
      >
        <Typography className="text-xs font-semibold cursor-pointer text-blue-gray-600">
          <EyeIcon {...icon} onClick={handleShowPostDetail}></EyeIcon>
        </Typography>
      </td>
    </tr>
  );
};

export default PostItemAdmin;
