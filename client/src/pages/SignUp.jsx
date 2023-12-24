import React, { useEffect, useState } from "react";
import { Input, InputPassword } from "../components/input";
import { AtIcon, EmailIcon, UserIcon } from "../components/Icon";
import { Button } from "../components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../sagas/auth/authSlice";
import { getDate } from "../hooks/useGetTime";
const schemaValidate = Yup.object({
  user_name: Yup.string()
    .required("Vui lòng nhập tên đăng nhập!")
    .matches(/^\S*$/, "Không được chứa khoảng trắng")
    .max(20, "Tên tài khoản không được dài quá 20 ký tự")
    .min(6, "Tên đăng nhập phải lớn hơn 6 kí tự"),
  full_name: Yup.string()
    .required("Vui lòng nhập họ và tên!")
    .max(22, "Tên không dài quá 23 ký tự")
    .min(6, "Tên đăng nhập phải lớn hơn 6 kí tự"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu!")
    .matches(/^\S*$/, "Không được chứa khoảng trắng")
    .min(6, "Mật khẩu có ít nhất 8 ký tự!")
    .max(20, "Mật khẩu không được dài quá 20 ký tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Mật khẩu cần có ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 số và 1 ký tự đặt biệt!"
    ),
  re_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Mật khẩu không khớp vui lòng nhập lại!"
  ),
  email: Yup.string()
    .required("Vui lòng nhập email!")
    .email("Vui lòng nhập đúng định dạng email!"),
});
const SignUp = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
    reset,
  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onChange" });
  const dispatch = useDispatch();
  const { errorGlobal } = useSelector((state) => state.global);
  const [error, setError] = useState("");
  const handleSignUp = (value) => {
    const date = getDate();
    if (isValid) {
      dispatch(registerRequest({ ...value, date, reset }));
    }
  };
  useEffect(() => {
    setError(errorGlobal);
  }, [errorGlobal]);
  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className="sign-up-form form_signin-signup "
    >
      <h2 className="title">Đăng Ký</h2>
      <div className="flex flex-col w-full gap-4 p-5 bg-white rounded-lg">
        <Input
          control={control}
          type="text"
          name={"user_name"}
          errors={errors}
          placeholder="Tài khoản"
          value=""
        >
          <AtIcon />
        </Input>
        <Input
          control={control}
          type="text"
          name={"full_name"}
          errors={errors}
          placeholder="Họ và tên"
          value=""
        >
          <UserIcon />
        </Input>
        <Input
          control={control}
          type="text"
          name={"email"}
          errors={errors}
          placeholder="Email"
          value=""
        >
          <EmailIcon />
        </Input>
        <InputPassword
          control={control}
          name={"password"}
          errors={errors}
          placeholder="Mật khẩu"
          value=""
        ></InputPassword>
        <InputPassword
          control={control}
          name={"re_password"}
          errors={errors}
          placeholder="Nhập lại mật khẩu"
          value=""
        ></InputPassword>
        <Button isLoading={isSubmitting} type="submit">
          Đăng ký
        </Button>
      </div>
    </form>
  );
};
export default SignUp;
