import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect } from "react";
import ModalBase from "../../modal/ModalBase";
import { Heading } from "../../../components/heading";
import { Field } from "../../../components/field";
import { FileInput, Input, InputPassword } from "../../../components/input";
import LayoutAdminModel from "../LayoutAdminModel";
import { addCustomerAdminRequest, updateCustomerAdminRequest } from "../../../sagas/admin/adminSlice";
import { closeAddCustomer, closeDetailCustomer, closeUpdateCustomer } from "../../../sagas/global/globalSlice";
import { AtSymbolIcon, EnvelopeIcon, MapIcon, UserIcon } from "@heroicons/react/24/outline";
import { icon } from "../../../ADMIN/routes";
import { Button } from "@material-tailwind/react";
import { getDate, getTimestamp } from "../../../hooks/useGetTime";

const schemaValidate = Yup.object({
    user_name: Yup.string().required("Vui lòng nhập tên đăng nhập!")
        .max(20, "Tên tài khoản không được dài quá 20 ký tự")
        .min(6, 'Tên đăng nhập phải lớn hơn 6 kí tự'),
    full_name: Yup.string().required("Vui lòng nhập họ và tên nhập!")
        .max(22, "Tên không dài quá 23 ký tự")
        .min(6, 'Tên đăng nhập phải lớn hơn 6 kí tự'),
    password: Yup.string()
        .required("Vui lòng nhập mật khẩu!")
        .min(6, 'Mật khẩu có ít nhất 8 ký tự!')
        .max(20, "Mật khẩu không được dài quá 20 ký tự")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Mật khẩu cần có ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 số và 1 ký tự đặt biệt!'),
    re_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp vui lòng nhập lại!'),
    email: Yup.string().required("Vui lòng nhập email!").email("Vui lòng nhập đúng định dạng email!"),
    address: Yup.string().required("Vui lòng nhập địa chỉ!"),
    image: Yup.mixed(),
})


const AddCustomerAdmin = () => {
    const dispatch = useDispatch();
    const { handleSubmit, setValue, formState: { errors }, control, reset
    } = useForm({ resolver: yupResolver(schemaValidate), mode: "onChange" });

    const handleClose = () => {
        dispatch(closeAddCustomer())
    }
    const { showAddCustomer } = useSelector((state) => state.global)
    const handleAddUser = (value) => {
        try {
            const date = getDate();
            const timestamps = getTimestamp();
            const customer = {
                ...value,
                date, timestamps
            };
            dispatch(addCustomerAdminRequest({ customer, reset }));
            handleClose();
            dispatch(closeDetailCustomer())
            resetImageField();
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
        }
    };

    const resetImageField = () => {
        setValue("image", "");
    };
    return (
        <ModalBase onClose={handleClose} visible={showAddCustomer}>
            <LayoutAdminModel onClick={handleClose}>
                <div className="p-2 md:p-5 bg-white w-full lg:h-[90%] rounded-xl mt-7  ">
                    <form onSubmit={handleSubmit(handleAddUser)} className=' px-2'>
                        <div className=' flex justify-between items-center border-b border-primary pb-5'>
                            <Heading isHeading className=''>Thêm người dùng</Heading>
                        </div>
                        <div className='flex gap-x-5 items-center my-10'>
                        </div>
                        <div className='grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-3 gap-x-10'>
                            <div className='flex items-center justify-center md:row-span-3 '>
                                <div className='relative  rounded-full 
                            !h-52 !w-52 md:!h-40 md:!w-40'>
                                    <FileInput errors={errors}
                                        isAvatar control={control} name={'image'} ></FileInput>
                                </div>
                            </div>
                            <Field>
                                <Input control={control} errors={errors}
                                    placeholder='Tài khoản' type='text' name='user_name' value={''} >
                                    <AtSymbolIcon {...icon}></AtSymbolIcon>
                                </Input>
                            </Field>
                            <Field>
                                <Input
                                    control={control}
                                    errors={errors}
                                    name='full_name'
                                    placeholder='Họ và tên'
                                    type='text'
                                    value={''}
                                >
                                    <UserIcon></UserIcon>
                                </Input>
                            </Field>
                            <InputPassword control={control} name={'password'} errors={errors} placeholder='Mật khẩu'
                                value='' ><UserIcon /></InputPassword>
                            <InputPassword control={control} name={'re_password'} errors={errors} placeholder='Nhập lại mật khẩu'
                                value='' ><UserIcon /></InputPassword>
                            <Field>
                                <Input control={control} errors={errors}
                                    placeholder='Email' type='email' name='email' value={''}  >
                                    <EnvelopeIcon {...icon}></EnvelopeIcon>
                                </Input>
                            </Field>
                            <Field>
                                <Input control={control} errors={errors}
                                    placeholder='Địa chỉ' type='text' name='address' value={''} >
                                    <MapIcon {...icon}></MapIcon>
                                </Input>
                            </Field>
                        </div>
                        <div className="w-full flex justify-center items-center mt-10">
                            <Button className='bg-primary w-full lg:w-auto' type='submit'>Thêm người dùng</Button>
                        </div>
                    </form>
                </div>
            </LayoutAdminModel>
        </ModalBase>
    );
};

export default AddCustomerAdmin;
