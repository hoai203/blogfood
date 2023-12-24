import React from "react";
import { Input, InputPassword } from "../components/input";
import { UserIcon } from "../components/Icon";
import { Button } from "../components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginRequest } from "../sagas/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
const schemaValidate = Yup.object({
  user_name: Yup.string()
    .required("Vui lòng nhập tên đăng nhập!")
    .max(20, "Tên tài khoản không được dài quá 20 ký tự")
    .min(6, "Tên đăng nhập phải lớn hơn 6 kí tự"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu!")
    .min(6, "Mật khẩu có ít nhất 8 ký tự!")
    .max(20, "Mật khẩu không được dài quá 20 ký tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Mật khẩu cần có ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 số và 1 ký tự đặt biệt!"
    ),
});
const SignIn = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate()
  const handleBackPage = () => {
    naviagte('/')
  }
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onChange" });
  const handleSignIn = (value) => {
    const info = { ...value }
    try {
      if (isValid) {
        dispatch(loginRequest({ info, handleBackPage }));
      }
    } catch (error) {
      console.log("err", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleSignIn)}
      className="sign-in-form form_signin-signup max-md:"
    >
      <h2 className="title">Đăng nhập</h2>
      <div className="flex flex-col w-full gap-6 p-5 m-auto bg-white rounded-lg">
        <Input
          control={control}
          type="text"
          name={"user_name"}
          errors={errors}
          placeholder="Tài khoản"
          value=""
        >
          <UserIcon />
        </Input>
        <InputPassword
          control={control}
          name={"password"}
          errors={errors}
          placeholder="Mật khẩu"
          value=""
        >
          <UserIcon />
        </InputPassword>
        <Link
          to={"/forgot-password"}
          className="px-5 text-sm font-bold text-right underline transition-all cursor-pointer text-primary hover:opacity-70 decoration-1"
        >
          Quên mật khẩu?
        </Link>
        <Button isLoading={isSubmitting} type="submit">
          Đăng nhập
        </Button>
      </div>
    </form>
  );
};

export default SignIn;
