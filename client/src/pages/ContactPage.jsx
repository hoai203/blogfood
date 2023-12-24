import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Field } from "../components/field";
import { Input } from "../components/input";
import {
  EnvelopeOpenIcon,
  UserIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getDate, getTimestamp } from "../hooks/useGetTime";
import { Label } from "../components/label";

import { Textarea } from "../components/textarea";
import {
  createFeedbacksRequest,
} from "../sagas/feedbackMail/feedbacksSlice";
import BannerCommon from "../layout/common/BannerCommon";
import useSetTitle from "../hooks/useSetTitle";

const schemaValidate = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập tên!"),
  email: Yup.string()
    .required("Vui lòng nhập email!")
    .email("Vui lòng nhập đúng định dạng email!"),
  phone: Yup.string().required("Vui lòng nhập số điện thoại!"),
  message: Yup.string().required("Vui lòng nhập số nội dung!"),
});
const ContactPage = () => {
  useSetTitle('Liên hệ')
  const dispatch = useDispatch();
  const { infoAuth } = useSelector((state) => state.auth);
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onBlur" });
  const handleSubmits = (value) => {
    const date = getDate();
    const timestamps = getTimestamp();
    const feedback = {
      ...value,
      date,
      timestamps,
    };
    if (isValid) {
      dispatch(createFeedbacksRequest({ feedback }));
      reset();
    }
  };
  return (
    <div className="bg-white">
      <BannerCommon
        image={"./src/assets/image/banner-post.jpg"}
        title="Liên hệ với chúng tôi"
      />
      <div className="w-full pt-12 pb-4 mx-auto">
        <div className="text-center ">
          <h5 className="relative inline-block mb-2 text-3xl font-extrabold text-primary font-dancing">
            <span className="absolute right-full border w-[80px] top-1/2 -translate-x-1/2 h-[1px] border-primary"></span>
            Liên hệ với chúng tôi{" "}
            <span className="absolute left-[120%] border  w-[80px] top-1/2 -translate-y-1/2 h-[1px] border-primary"></span>
          </h5>
          <h1 className="mb-12 text-4xl font-bold">
            Liên hệ nếu có bất kỳ câu hỏi nào
          </h1>
        </div>
        <div className="page-content ">
          <div className="grid w-full grid-cols-1 md:grid-cols-3 text-center">
            <div className="">
              <h5 className="relative inline-block  mb-2 text-3xl font-extrabold text-primary font-dancing">
                Facebook

              </h5>

              <p className="mb-4 text-base">facebook.com/foodsvietblog_203</p>
            </div>
            <div className="">
              <h5 className="relative inline-block  mb-2 text-3xl font-extrabold text-primary font-dancing">
                Email
              </h5>

              <p className="mb-4 text-base">foodsvietblog203@gmail.com</p>
            </div>
            <div className=" text-center">
              <h5 className="relative inline-block  mb-2 text-3xl font-extrabold text-primary font-dancing">
                Hotline
              </h5>
              <p className="mb-4 text-base">032 884 6202</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 mx-5 mt-10 md:grid-cols-2">
            <div className="w-full h-[370px]">
              <img
                src="../src/assets/image/pixzolo-photography-Qtd5z7g4thc-unsplash.jpg"
                alt=""
                className="object-cover w-full h-full rounded-lg "
              />
            </div>
            <div className="w-full ">
              <form
                action=""
                className="flex flex-col"
                onSubmit={handleSubmit(handleSubmits)}
              >
                <div className="flex flex-col w-full lg:flex-row">
                  <div className="w-full lg:w-2/4 px-4 py-3">
                    <div className="">
                      <Field>
                        <Input
                          control={control}
                          errors={errors}
                          value={infoAuth?.full_name}
                          name="fullName"
                          placeholder="Nhập tên"
                          type="text"
                          disable={infoAuth?.full_name ? true : false}
                        >
                          <UserIcon />
                        </Input>
                      </Field>
                    </div>
                  </div>
                  <div className="w-full lg:w-2/4 px-4 py-3">
                    <div className="">
                      <Field>
                        <Input
                          control={control}
                          errors={errors}
                          value={infoAuth?.email}
                          name="email"
                          placeholder="Nhập email"
                          type="email"
                          disable={infoAuth?.email ? true : false}
                        >
                          <EnvelopeOpenIcon />
                        </Input>
                      </Field>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 py-3">
                  <div className="">
                    <Field>
                      <Input
                        control={control}
                        errors={errors}
                        value={infoAuth?.phone}
                        name="phone"
                        placeholder="Nhập số điện thoại"
                        type="text"
                        disable={infoAuth?.phone ? true : false}
                      >
                        <PhoneIcon />
                      </Input>
                    </Field>
                  </div>
                </div>
                <div className="w-full px-4 py-3">
                  <div className="">
                    <Field>
                      <Label htmlFor={"message"}>Nội dung</Label>
                      <Textarea
                        control={control}
                        errors={errors}
                        name={"message"}
                      />
                    </Field>
                  </div>
                </div>
                <div className="w-full px-4 py-3">
                  <button
                    type="submit"
                    className="w-full py-4 text-lg font-semibold text-white rounded-sm bg-primary"
                  >
                    Gửi phản hồi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
