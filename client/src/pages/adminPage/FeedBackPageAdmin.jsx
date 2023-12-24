import React, { useEffect } from "react";
import LoadingRequest from "../../layout/loading/LoadingRequest";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { icon } from "../../ADMIN/routes";
import FeedBackItemAdmin from "../../layout/adminLayout/feedBacks/FeedBackItemAdmin";
import FeedBackDetail from "../../layout/adminLayout/feedBacks/FeedBackDetail";
import { FeedbackRequest } from "../../sagas/feedbackMail/feedbacksSlice";
import useSetTitle from "../../hooks/useSetTitle";

const FeedBackPageAdmin = () => {
  const { loading, feedback } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();
  const handLoad = () => {
    dispatch(FeedbackRequest());
  };
  useEffect(() => {
    dispatch(FeedbackRequest());
  }, []);
  useEffect(() => {
    handLoad()
  }, []);
  useSetTitle('Quản lý phản hồi')
  return (
    <div>
      <LoadingRequest show={loading}></LoadingRequest>
      <div className="relative flex flex-col gap-12 mt-12 mb-8">
        <Card>
          <CardHeader
            variant="gradient"
            className="z-10 flex items-center justify-between p-6 mb-8 bg-primary"
          >
            <Typography variant="h6" color="white">
              Danh sách phản hồi
            </Typography>
            <div onClick={handLoad} className="text-white cursor-pointer">
              <ArrowPathIcon {...icon} />
            </div>
          </CardHeader>
          <CardBody className="px-0 pt-0 pb-2 mt-0 overflow-x-scroll">
            <table className="w-full min-w-[840px] table-auto">
              <thead>
                <tr>
                  {[
                    "người dùng",
                    "email",
                    "số điện thoại",
                    "thời gian",
                    "tình trạng",
                    "",
                  ].map((el, index) => (
                    <th
                      key={index}
                      className="px-5 py-3 text-left bg-white border-b border-blue-gray-50 last:sticky last:right-0 last:shadow-inner last:md:shadow-none "
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {feedback &&
                  feedback?.length > 0 &&
                  feedback?.map((data) => (
                    <FeedBackItemAdmin key={data?._id} data={data} />
                  ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
      <FeedBackDetail></FeedBackDetail>
    </div>
  );
};

export default FeedBackPageAdmin;
