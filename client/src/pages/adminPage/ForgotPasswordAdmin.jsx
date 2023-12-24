import { Link, useNavigate } from "react-router-dom";
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
import { UserIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { forgotPassworAdmindRequest } from "../../sagas/feedbackMail/feedbacksSlice";
import { icon } from "../../ADMIN/routes";
import useSetTitle from "../../hooks/useSetTitle";
const schemaValidate = Yup.object({
  user_name: Yup.string()
    .required("Vui lòng nhập tên đăng nhập!")
    .max(20, "Tên tài khoản không được dài quá 20 ký tự")
    .min(4, "Tên đăng nhập phải lớn hơn 6 kí tự"),
});
const ForgotPasswordAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/admin/signin')
  }
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
    control,
  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onChange" });
  const handleResetPasswordAdmin = (value) => {
    const user_name = {
      ...value,
    };

    if (isValid) {
      dispatch(forgotPassworAdmindRequest({ user_name, handleBack }));
      reset();
      // navigate("/admin/signin");
    }
  };
  useSetTitle('Quên mật khẩu')

  return (
    <>
      <Link
        to={"/admin/signin"}
        className="fixed top-2 left-5 flex justify-center items-center gap-5 text-white z-[10]"
      >
        <ArrowLeftIcon {...icon} /> Quay lại trang đăng nhập
      </Link>
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
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="submit" variant="gradient" fullWidth>
              Gửi
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default ForgotPasswordAdmin;
