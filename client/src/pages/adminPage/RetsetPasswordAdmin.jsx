import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginAdminRequest } from "../../sagas/admin/adminSlice";
import { Input, InputPassword } from "../../components/input";
import { UserIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { resetPasswordAdminRequest } from "../../sagas/feedbackMail/feedbacksSlice";
import useSetTitle from "../../hooks/useSetTitle";
const schemaValidate = Yup.object({
  // password: Yup.string()
  //   .required("Vui lòng nhập mật khẩu!")
  //   .min(6, "Mật khẩu có ít nhất 8 ký tự!")
  //   .max(20, "Mật khẩu không được dài quá 20 ký tự")
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //     "Mật khẩu cần có ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 số và 1 ký tự đặt biệt!"
  //   ),
  // re_password: Yup.string().oneOf(
  //   [Yup.ref("password"), null],
  //   "Mật khẩu không khớp vui lòng nhập lại!"
  // ),
});
const RetsetPasswordAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const tokenParams = new URLSearchParams(location.search).get("token");
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onChange" });
  const handleBack = () => {
    navigate("/admin/signin");
  };
  const handleResetPasswordAdmin = (value) => {
    try {
      if (isValid) {
        dispatch(
          resetPasswordAdminRequest({
            password: value.password,
            token: tokenParams,
            handleBack,
          })
        );
      }
    } catch (error) {
      console.log("err", error);
    }
  };
  useSetTitle('Đổi mật khẩu')
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <form
        onSubmit={handleSubmit(handleResetPasswordAdmin)}
        className="container mx-auto p-4"
      >
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            className="mb-4 grid h-28 place-items-center bg-primary"
          >
            <Typography variant="h3" color="white">
              ADMIN
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
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
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="submit" variant="gradient" fullWidth>
              Đặt lại mật khẩu
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default RetsetPasswordAdmin;
