import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect } from "react";
import { categoriesRequest } from "../../../sagas/categories/categoriesSlice";
import ModalBase from "../../modal/ModalBase";
import { Heading } from "../../../components/heading";
import { Field } from "../../../components/field";
import { FileInput, Input, InputTextarea } from "../../../components/input";
import { BookmarkIcon } from "../../../components/Icon";
import { Label } from "../../../components/label";
import { Button } from "../../../components/button";
import LayoutAdminModel from "../LayoutAdminModel";
import { updateCategoriesAdminRequest } from "../../../sagas/admin/adminSlice";
import { closeDetailCategory, closeUpdateCategory } from "../../../sagas/global/globalSlice";

const schemaValidate = Yup.object({
  title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  image: Yup.mixed(),
});

const CategoryEditAdmin = () => {
  const dispatch = useDispatch();
  const { handleSubmit, setValue, formState: { errors }, control,
  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onBlur" });
  const { showUpdateCategory } = useSelector((state) => state.global);
  const { categoryDetail } = useSelector((state) => state.admin);
  const handleClose = () => {
    dispatch(closeUpdateCategory())
  }
  const handleSubmits = (value) => {
    try {
      const category = { ...value };
      dispatch(
        updateCategoriesAdminRequest({
          id: categoryDetail._id,
          category,
          slug: categoryDetail.slug,
        })
      );
      handleClose();
      dispatch(closeDetailCategory())
      resetImageField();
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  const resetImageField = () => {
    setValue("image", "");
  };
  useEffect(() => {
    if (categoryDetail) {
      setValue("title", categoryDetail.title);
    }
  }, [categoryDetail, setValue]);
  useEffect(() => {
    dispatch(categoriesRequest());
  }, []);
  return (
    <ModalBase onClose={handleClose} visible={showUpdateCategory}>
      <LayoutAdminModel onClick={handleClose}>
        <div className="p-10 bg-white">
          <Heading isHeading className="mb-10">Thêm loại</Heading>
          <form
            onSubmit={handleSubmit(handleSubmits)}
            className="flex flex-col mb-10 text-center gap-y-10 "
          >
            <Field>
              <InputTextarea
                control={control}
                errors={errors}
                name="title"
                value={categoryDetail?.title}
                placeholder="Nhập tiêu đề loại"
                type="text"
              >
                <BookmarkIcon />
              </InputTextarea>
            </Field>
            <div className="col-span-1 mb-10 md:col-span-2">
              <Label htmlFor={"image"}>Hình ảnh</Label>
              <FileInput
                oldImage={categoryDetail?.image}
                control={control}
                name={"image"}
                errors={errors}
                lable={"Hình ảnh"}
              />
            </div>
            <Button type="submit" className="mx-auto ">
              Sửa loại
            </Button>
          </form>
        </div>
      </LayoutAdminModel>
    </ModalBase>
  );
};

export default CategoryEditAdmin;
