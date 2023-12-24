import { EyeIcon } from "@heroicons/react/24/outline";
import { Avatar, Chip, Typography } from "@material-tailwind/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { icon } from "../../../ADMIN/routes";
import useTimeSince from "../../../hooks/useTimeSince";
import { detailCategoriesAdminSuccess } from "../../../sagas/admin/adminSlice";
import { toggleDetailCategory } from "../../../sagas/global/globalSlice";

const CategoryItemAdmin = ({ data }) => {
  const className = "px-5 py-3";
  const { admin } = useSelector((state) => state.admin);
  const timeSince = useTimeSince();
  const dispatch = useDispatch();
  const dataAdmin = admin.filter((ad) => ad._id === data?.id_author)[0];

  const handleShowCategoryDetail = () => {
    dispatch(toggleDetailCategory());
    dispatch(detailCategoriesAdminSuccess({ ...data }));
  };
  return (
    <>
      <tr className="border-b border-blue-gray-50 last:border-b-0" id={data?._id}>
        <td className={`${className} max-w-[500px]`}>
          <div className="flex items-center gap-4">
            <Avatar lazy-src={data?.image} className='bg-primary border-none bg-opacity-5' size="lg" />
            <div className="flex-1">
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
            {dataAdmin?.full_name || ""}
          </Typography>
          <Typography className="text-xs font-normal text-blue-gray-500">
            {dataAdmin?.user_name || ""}
          </Typography>
        </td>
        <td className={`${className}`}>
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
            <EyeIcon {...icon} onClick={handleShowCategoryDetail}></EyeIcon>
          </Typography>
        </td>
      </tr>
    </>
  );
};

export default CategoryItemAdmin;
