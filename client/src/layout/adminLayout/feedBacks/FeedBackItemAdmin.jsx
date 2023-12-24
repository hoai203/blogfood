import { EyeIcon } from "@heroicons/react/24/outline";
import { Chip, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { icon } from "../../../ADMIN/routes";
import { useDispatch, useSelector } from "react-redux";
import { toggleFeedback } from "../../../sagas/global/globalSlice";
import { feedbackDetailAdminSuccess } from "../../../sagas/feedbackMail/feedbacksSlice";

const FeedBackItemAdmin = ({ data }) => {
  const className = "px-5 py-3";
  const dispatch = useDispatch();
  function handleShowFeedBackDetail() {
    console.log("hand");
    dispatch(toggleFeedback());
    dispatch(feedbackDetailAdminSuccess({ ...data }));
  }
  return (
    <>
      <tr className="border-b border-blue-gray-50 last:border-b-0">
        <td className={`${className} max-w-[500px]`}>
          <div className="flex items-center gap-4">
            {/* <Avatar src={data?.image} alt={data?.title} size="lg" /> */}
            <div className="flex-1">
              <Typography className="text-xs font-normal text-blue-gray-500">
                {data?.user_name || ""}
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
              >
                {data?.fullName}
              </Typography>
            </div>
          </div>
        </td>
        <td className={className}>
          <Typography className="text-xs font-semibold text-blue-gray-600">
            {data?.email || ""}
          </Typography>
        </td>
        <td className={`${className} `}>
          <Typography className="text-xs font-semibold text-blue-gray-600">
            {data?.phone || ""}
          </Typography>
        </td>
        <td className={className}>
          <Typography className="flex flex-col text-xs font-semibold text-blue-gray-600">
            <span>{data?.date || ""}</span>
            {/* <span className='font-normal text-gray-500'>({timeSince(data?.timestamps || Date.now())})</span> */}
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
                ? "Đã phản hồi"
                : data?.status === "pending"
                  ? "Chờ phản hồi"
                  : "vô hiệu hóa"
            }
            className="py-0.5 px-2 text-[11px] font-medium inline-block"
          />
        </td>
        <td
          className={`${className} sticky right-0 bg-white shadow-inner md:shadow-none`}
        >
          <Typography className="text-xs font-semibold cursor-pointer text-blue-gray-600">
            <EyeIcon {...icon} onClick={handleShowFeedBackDetail}></EyeIcon>
          </Typography>
        </td>
      </tr>
    </>
  );
};

export default FeedBackItemAdmin;
