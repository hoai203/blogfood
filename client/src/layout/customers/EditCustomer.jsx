
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup";
import Overlay from '../common/Overlay';
import { AtIcon, CloseIcon, EmailIcon, LocationIcon, UserIcon } from '../../components/Icon';
import { Heading } from '../../components/heading';
import { FileInput, Input } from '../../components/input';
import { Field } from '../../components/field';
import ModalBase from '../modal/ModalBase';
import { useDispatch, useSelector } from 'react-redux';
import { customersRequest, setLoadingCustomer, updateCustomerRequest } from '../../sagas/customers/customersSlice';
import { setNotifyGlobal, toggleChangePassword } from '../../sagas/global/globalSlice';
import { useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { useNavigate } from "react-router-dom";

const schemaValidate = Yup.object().shape({
    address: Yup.string().required("Vui lòng nhập địa chỉ!"),
    image: Yup.mixed(),
    full_name: Yup.string().required("Vui lòng nhập họ và tên!")
        .max(20, 'Không được nhập quá 20 ký tự!')
        .min(5, 'Bạn phải nhập trên 5 kí tự!'),
    email: Yup.string().required("Vui lòng nhập email!").email("Vui lòng nhập đúng định dạng email!"),
})

const EditCustomer = ({ data, show, onClick = () => { } }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const slug = data?.slug
    const { handleSubmit, setValue, formState: { errors }, control } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onChange', })
    const handleSetURL = (URL) => {
        navigate(`/info/${URL}`, { replace: true })
    }
    const handleEditUser = (value) => {
        try {
            dispatch(setLoadingCustomer(true))
            const info = { ...value };
            const id = data?._id
            dispatch(updateCustomerRequest({ id, info, slug, handleSetURL }));
            onClick()
            resetImageField()
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
        }
    }
    const resetImageField = () => {
        setValue('image', '');
    };
    const handleShowChangePassword = () => {
        dispatch(toggleChangePassword())
    }
    return (
        <ModalBase onClose={onClick} visible={show}>
            <div className={`content absolute md:fixed w-full top-20  transition-all bg-white z-[99] p-10 pb-20`}>
                <div className='absolute right-2 top-2 text-2xl cursor-pointer'
                    onClick={onClick}><CloseIcon></CloseIcon></div>
                <form onSubmit={handleSubmit(handleEditUser)} className=' px-2'>
                    <div className=' flex justify-between items-center border-b border-primary pb-5'>
                        <Heading isHeading className=''>Chỉnh sửa thông tin</Heading>
                        <Button className='bg-primary' type='submit'>Lưu</Button>
                    </div>
                    <div className='flex gap-x-5 items-center my-10'>
                    </div>
                    <div className='grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-3 gap-x-10'>
                        <div className='flex items-center justify-center row-span-2 '>
                            <div className='relative  rounded-full 
                            !h-52 !w-52 md:!h-40 md:!w-40'>
                                <FileInput errors={errors} oldImage={data?.image}
                                    isAvatar control={control} name={'image'} ></FileInput>
                            </div>
                        </div>
                        <Field>
                            <Input control={control} disable value={data?.user_name} errors={errors}
                                placeholder='User Name' type='text' name='user_name' >
                                <AtIcon></AtIcon>
                            </Input>
                        </Field>
                        <Field>
                            <Input control={control} value={data?.full_name} errors={errors}
                                placeholder='Full name' type='text' name='full_name'>
                                <UserIcon></UserIcon>
                            </Input>
                        </Field>
                        <Field>
                            <Input control={control} value={data?.email} errors={errors}
                                placeholder='Email' type='email' name='email' >
                                <EmailIcon></EmailIcon>
                            </Input>
                        </Field>
                        <Field>
                            <Input control={control} value={data?.address} errors={errors}
                                placeholder='Address' type='text' name='address' >
                                <LocationIcon></LocationIcon>
                            </Input>
                        </Field>
                    </div>
                </form>
                <div className='flex justify-end w-full'>
                    <span onClick={handleShowChangePassword}
                        className='text-sm text-primary cursor-pointer mr-2 mt-5 lg:mt-0'>Đổi mật khẩu</span>
                </div>
            </div>
        </ModalBase>

    )
}

export default EditCustomer