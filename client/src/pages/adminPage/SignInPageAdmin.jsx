import { Link, useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Typography,
} from "@material-tailwind/react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdminRequest } from "../../sagas/admin/adminSlice";
import { Input, InputPassword } from "../../components/input";
import { UserIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import useSetTitle from "../../hooks/useSetTitle";
const schemaValidate = Yup.object({
    user_name: Yup.string().required("Vui lòng nhập tên đăng nhập!")
        .max(20, "Tên tài khoản không được dài quá 20 ký tự")
        .min(4, 'Tên đăng nhập phải lớn hơn 6 kí tự'),
    password: Yup.string()
        .required("Vui lòng nhập mật khẩu!")
        .min(6, 'Mật khẩu có ít nhất 8 ký tự!')
        .max(20, "Mật khẩu không được dài quá 20 ký tự")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Mật khẩu cần có ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 số và 1 ký tự đặt biệt!'),

})
export function SignInPageAdmin() {
    const dispatch = useDispatch()
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onChange', })
    const handleSignInAdmin = (value) => {
        try {
            if (isValid) {
                dispatch(loginAdminRequest(value))
            }
        } catch (error) {
            console.log('err', error);
        }
    }
    const { tokenAdmin } = useSelector((state) => state.admin);
    const navigate = useNavigate();
    useSetTitle('Đăng nhập quản trị viên')
    useEffect(() => {
        if (tokenAdmin) navigate('/admin/')
    }, [tokenAdmin]);
    return (
        <>
            <img
                src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
                className="absolute inset-0 z-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
            <form onSubmit={handleSubmit(handleSignInAdmin)} className="container mx-auto p-4">
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
                        <Input control={control} type='text' name={'user_name'} errors={errors} placeholder='Tài khoản'
                            value='' ><UserIcon /></Input>
                        <InputPassword control={control} name={'password'} errors={errors} placeholder='Mật khẩu'
                            value='' ></InputPassword>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button type="submit" variant="gradient" fullWidth>
                            Sign In
                        </Button>
                        <Typography variant="small" className="mt-6 flex justify-center">Bạn quên mật khẩu?
                            <Link to="/admin/forgot-password">
                                <Typography
                                    as="span"
                                    variant="small"
                                    color="blue"
                                    className="ml-1 font-bold"
                                >
                                    Lấy mật khẩu
                                </Typography>
                            </Link>
                        </Typography>
                    </CardFooter>
                </Card>
            </form>
        </>
    );
}

export default SignInPageAdmin;
