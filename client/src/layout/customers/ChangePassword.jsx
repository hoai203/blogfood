
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup";
import { Heading } from '../../components/heading';
import { InputPassword } from '../../components/input';
import ModalBase from '../modal/ModalBase';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordRequest, setLoadingCustomer } from '../../sagas/customers/customersSlice';
import { closeChangePassword } from '../../sagas/global/globalSlice';
import { Button } from '@material-tailwind/react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import LayoutAdminModel from '../adminLayout/LayoutAdminModel';

const schemaValidate = Yup.object().shape({
    password: Yup.string()
        .required("Vui lòng nhập mật khẩu!")
        .min(6, 'Mật khẩu có ít nhất 8 ký tự!')
        .max(20, "Mật khẩu không được dài quá 20 ký tự")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Mật khẩu cần có ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 số và 1 ký tự đặt biệt!'),
    new_password: Yup.string()
        .required("Vui lòng nhập mật khẩu!")
        .min(6, 'Mật khẩu có ít nhất 8 ký tự!')
        .max(20, "Mật khẩu không được dài quá 20 ký tự")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Mật khẩu cần có ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 số và 1 ký tự đặt biệt!'),
    re_password: Yup.string()
        .oneOf([Yup.ref('new_password'), null], 'Mật khẩu không khớp vui lòng nhập lại!'),
})

const ChangePassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { showChangePassword } = useSelector((state) => state.global)
    const { handleSubmit, reset, formState: { errors }, control } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onChange', })
    const handleChangePassword = (value) => {
        try {
            dispatch(setLoadingCustomer(true))
            const { new_password, re_password } = value;
            const dataPassword = { ...value }
            if (new_password !== re_password) return toast.error('Vui lòng nhập đúng mật khẩu!')
            dispatch(changePasswordRequest({ dataPassword, reset }));
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
        }
    }
    const handleClose = () => {
        dispatch(closeChangePassword())
    }
    return (
        <ModalBase onClose={handleClose} visible={showChangePassword}>
            <LayoutAdminModel onClick={handleClose} z={9999} className='!h-auto !max-w-[80%] sm:!max-w-[70%] md:!max-w-[50%] lg:!max-w-[40%]'>
                <form onSubmit={handleSubmit(handleChangePassword)} className=' p-5 md:p-0'>
                    <div className=' flex justify-between items-center border-b border-primary pb-5'>
                        <Heading isHeading className=''>Đổi mật khẩu</Heading>
                    </div>
                    <div className='grid grid-cols-1 gap-y-10 gap-x-10 w-full lg:px-10 my-5'>
                        <InputPassword control={control} name={'password'} errors={errors}
                            placeholder='Mật khẩu'
                            value='' ></InputPassword>
                        <InputPassword control={control} name={'new_password'} errors={errors}
                            placeholder='Mật khẩu mới' value='' ></InputPassword>
                        <InputPassword control={control} name={'re_password'} errors={errors}
                            placeholder='Nhập lại mật khẩu mới' value='' ></InputPassword>
                        <Button className='bg-primary' type='submit'>Lưu</Button>
                    </div>
                </form>
            </LayoutAdminModel>
        </ModalBase>
    )
}

export default ChangePassword