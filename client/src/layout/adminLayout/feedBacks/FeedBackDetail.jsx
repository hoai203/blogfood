import React, { } from "react";
import ModalBase from "../../modal/ModalBase";
import LayoutAdminModel from "../LayoutAdminModel";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

import { useDispatch, useSelector } from "react-redux";
import { WrapInfo } from "../../../pages/InfoUser";
import { EmailIcon, UserIcon } from "../../../components/Icon";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PhoneIcon } from "@heroicons/react/24/outline";


import {
  closeFeedback,
} from "../../../sagas/global/globalSlice";
import { useForm } from "react-hook-form";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Textarea } from "../../../components/textarea";
import { sendFeedbacksRequest } from "../../../sagas/feedbackMail/feedbacksSlice";
import { Button } from "../../../components/button";
import { icon } from "../../../ADMIN/routes";
const schemaValidate = Yup.object({
  message: Yup.string().required("Vui lòng nhập số nội dung!"),
});
const CustomerDetailAdmin = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
    reset,
  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onBlur" });
  const { showFeedback, isUploadImage } = useSelector((state) => state.global);
  const { feedbackDetail } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();
  const handleSubmits = (value) => {
    const feedback = {
      ...value,
      fullName: feedbackDetail?.fullName,
      email: feedbackDetail?.email,
      phone: feedbackDetail?.phone,
    };
    if (isValid) {
      dispatch(sendFeedbacksRequest({ ...feedback, id: feedbackDetail?._id }));
      reset();
      handleClose();
    }
  };
  const handleClose = () => {
    dispatch(closeFeedback());
  };
  return (
    <>
      <ModalBase onClose={handleClose} visible={showFeedback}>
        <LayoutAdminModel onClick={handleClose} className=" md:!max-w-[80%] lg:!max-w-[70%]">
          <Card className="mx-3  mb-6 lg:mx-4">
            <CardBody className="p-4">
              <div className="mb-1 flex items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {feedbackDetail?.full_name || ""}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                    >
                      {feedbackDetail?.user_name || ""}
                    </Typography>
                  </div>
                </div>
              </div>
              <div
                className=" flex-auto h-auto bg-white rounded-xl p-5 pt-0 flex gap-x-10 flex-col md:flex-row
                md:gap-y-10 mb-10"
              >
                <div className="text-xs md:text-sm flex-1">
                  <WrapInfo>
                    <UserIcon /> <p>{feedbackDetail?.fullName}</p>
                  </WrapInfo>
                </div>
                <div className="text-xs md:text-sm flex-1">
                  <WrapInfo>
                    <PhoneIcon className="w-[13px] h-[13px]  md:w-[15px] md:h-[15px]  text-inherit" /> <p>{feedbackDetail?.phone}</p>
                  </WrapInfo>
                </div>
                <div className="text-xs md:text-sm flex-1">
                  <WrapInfo>
                    <EmailIcon />{" "}
                    <p className="w-[80%]">
                      {feedbackDetail?.email || "Chưa có"}
                    </p>
                  </WrapInfo>
                </div>
              </div>
              <div className="px-4 pb-4 pt-2 bg-primary bg-opacity-5 rounded-xl">
                <div className="text-xs leading-6 md:text-sm lg:text-base text-center">
                  <Typography variant="h5" color="blue-gray" className="my-6">Nội dung</Typography>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: feedbackDetail?.message,
                    }}
                    className="content_post !text-xs md"
                  />
                </div>
              </div>
              <div className="px-4 pb-4 mt-16">
                <Typography variant="h6" color="blue-gray" className=" text-center">
                  Phản hồi cho người dùng
                </Typography>
                <div className="mt-2 ">
                  <form action="" onSubmit={handleSubmit(handleSubmits)}>
                    <Field>
                      <Textarea
                        control={control}
                        errors={errors}
                        name={"message"}
                      />
                    </Field>
                    <div className="w-full flex justify-center items-center mt-10">
                      <Button
                        className="bg-primary w-full lg:w-auto" isLoading={isUploadImage}
                        type="submit"
                      >
                        Gửi phản hồi
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </CardBody>
          </Card>
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
