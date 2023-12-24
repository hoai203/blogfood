import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect } from "react";
import ModalBase from "../../modal/ModalBase";
import { Heading } from "../../../components/heading";
import { Field } from "../../../components/field";
import { FileInput, Input } from "../../../components/input";
import LayoutAdminModel from "../LayoutAdminModel";
import { updateAdminRequest, updateCustomerAdminRequest } from "../../../sagas/admin/adminSlice";
import { closeDetailAdmin, closeDetailCustomer, closeUpdateAdmin, closeUpdateCustomer } from "../../../sagas/global/globalSlice";
import { AtSymbolIcon, EnvelopeIcon, MapIcon, UserIcon } from "@heroicons/react/24/outline";
import { icon } from "../../../ADMIN/routes";
import { Button } from "@material-tailwind/react";

const schemaValidate = Yup.object({
    address: Yup.string().required("Vui lòng nhập địa chỉ!"),
    user_name: Yup.string(),
    image: Yup.mixed(),
    full_name: Yup.string().required("Vui lòng nhập họ và tên!"),
    email: Yup.string().required("Vui lòng nhập email!"),
})


const EditAdmin = () => {
    const dispatch = useDispatch();
    const { handleSubmit, setValue, formState: { errors }, control,
    } = useForm({ resolver: yupResolver(schemaValidate), mode: "onBlur" });
    const { adminDetail } = useSelector((state) => state.admin);
    const { showUpdateAdmin } = useSelector((state) => state.global);
    const handleClose = () => {
        dispatch(closeUpdateAdmin())
    }
    const handleEditUser = (value) => {
        try {
            const admin = { ...value };
            dispatch(updateAdminRequest({ id: adminDetail._id, admin, slug: adminDetail.slug }));
            handleClose();
            dispatch(closeDetailAdmin())
            resetImageField();
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
        }
    };

    const resetImageField = () => {
        setValue("image", "");
    };
    useEffect(() => {
        if (adminDetail) {
            setValue("full_name", adminDetail.full_name);
            setValue("user_name", adminDetail.user_name);
            setValue("email", adminDetail.email);
            setValue("address", adminDetail.address);
        }
    }, [adminDetail, setValue]);
    return (
        <ModalBase onClose={handleClose} visible={showUpdateAdmin}>
            <LayoutAdminModel onClick={handleClose}>
                <div className="p-2 md:p-5 bg-white w-full lg:h-[90%] rounded-xl mt-7  ">
                    <form onSubmit={handleSubmit(handleEditUser)} className=' px-2'>
                        <div className=' flex justify-between items-center border-b border-primary pb-5'>
                            <Heading isHeading className=''>Chỉnh sửa thông tin</Heading>
                        </div>
                        <div className='flex gap-x-5 items-center my-10'>
                        </div>
                        <div className='grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-3 gap-x-10'>
                            <div className='flex items-center justify-center row-span-2 '>
                                <div className='relative  rounded-full 
                            !h-52 !w-52 md:!h-40 md:!w-40'>
                                    <FileInput errors={errors} oldImage={adminDetail?.image}
                                        isAvatar control={control} name={'image'} ></FileInput>
                                </div>
                            </div>
                            <Field>
                                <Input control={control} disable value={adminDetail?.user_name} errors={errors}
                                    placeholder='Tài khoản' type='text' name='user_name' >
                                    <AtSymbolIcon {...icon}></AtSymbolIcon>
                                </Input>
                            </Field>
                            <Field>
                                <Input
                                    control={control}
                                    errors={errors}
                                    value={adminDetail?.full_name}
                                    name='full_name'
                                    placeholder='Họ và tên'
                                    type='text'
                                >
                                    <UserIcon></UserIcon>
                                </Input>
                            </Field>
                            <Field>
                                <Input control={control} errors={errors} value={adminDetail?.email}
                                    placeholder='Email' type='email' name='email' >
                                    <EnvelopeIcon {...icon}></EnvelopeIcon>
                                </Input>
                            </Field>
                            <Field>
                                <Input control={control} errors={errors} value={adminDetail?.address}
                                    placeholder='Địa chỉ' type='text' name='address' >
                                    <MapIcon {...icon}></MapIcon>
                                </Input>
                            </Field>
                        </div>
                        <div className="w-full flex justify-center items-center mt-10">
                            <Button className='bg-primary w-full lg:w-auto' type='submit'>Lưu thông tin</Button>
                        </div>
                    </form>
                </div>
            </LayoutAdminModel>
        </ModalBase>
    );
};

export default EditAdmin;
