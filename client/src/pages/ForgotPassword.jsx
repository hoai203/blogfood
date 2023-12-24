import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Input } from "../components/input";
import { EmailIcon } from "../components/Icon";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { icon } from "../ADMIN/routes";
import { useDispatch } from "react-redux";
import { forgotPasswordRequest } from "../sagas/feedbackMail/feedbacksSlice";
import useSetTitle from "../hooks/useSetTitle";

const schemaValidate = Yup.object({
  user_name: Yup.string().required("Vui lòng nhập tài khoản!"),
});

const ForgotPassword = () => {
  useSetTitle('Quên mật khẩu')
  const dispatch = useDispatch();
  const handleSubmits = (value) => {
    const user_name = {
      ...value,
    };

    if (isValid) {
      dispatch(forgotPasswordRequest({ user_name }));
      reset();
    }
  };
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
    reset,
  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onChange" });
  return (
    <div className="">
      <div
        className="relative flex items-center justify-center h-screen"
        style={{ backgroundImage: `url('./src/assets/image/login-bg.jpg')` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <Link
          to={"/"}
          className="fixed top-2 right-5 flex justify-center items-center gap-5 text-white z-[10]"
        >
          Quay lại trang chủ <ArrowRightIcon {...icon} />
        </Link>

        <div className="w-[650px] text-center z-[10]">
          <form onSubmit={handleSubmit(handleSubmits)} className="">
            <h2 className="mb-3 text-4xl text-[#fff]">Quên Mật Khẩu</h2>
            <div className="flex flex-col w-full gap-4 p-5 bg-white rounded-lg">
              <Input
                control={control}
                type="text"
                name={"user_name"}
                errors={errors}
                placeholder="Tài khoản"
                value=""
              >
                <EmailIcon />
              </Input>

              <Button isLoading={isSubmitting} type="submit">
                Gửi
              </Button>
            </div>
          </form>
        </div>
        <Link
          to={"/signin"}
          className="fixed top-2 left-5 flex justify-center items-center gap-5 text-white z-[10]"
        >
          <ArrowLeftIcon {...icon} /> Quay lại trang đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
