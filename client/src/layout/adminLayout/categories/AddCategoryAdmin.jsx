import React from "react";
import ModalBase from "../../modal/ModalBase";
import { useDispatch, useSelector } from "react-redux";
import { Heading } from "../../../components/heading";
import LayoutAdminModel from "../LayoutAdminModel";
import { Button } from "../../../components/button";
import { Field } from "../../../components/field";
import { FileInput, Input, InputTextarea } from "../../../components/input";
import { BookmarkIcon } from "../../../components/Icon";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "../../../components/label";
import { getDate, getTimestamp } from "../../../hooks/useGetTime";
import { addCategoriesAdminRequest } from "../../../sagas/admin/adminSlice";
import { closeAddCategory } from "../../../sagas/global/globalSlice";

const schemaValidate = Yup.object({
  title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  image: Yup.mixed().required("Vui lòng nhập ảnh!"),
});
const AddCategoryAdmin = () => {
  const {
    handleSubmit,
    formState: { errors }, reset,
    control,
  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onBlur" });

  const handleCloseCategory = () => {
    dispatch(closeAddCategory())
  }
  const dispatch = useDispatch();
  const { infoAdmin } = useSelector((state) => state.admin);
  const { showAddCategory } = useSelector((state) => state.global);
  const handleAddCategory = (value) => {
    const date = getDate();
    const timestamps = getTimestamp();
    const id_author = infoAdmin?._id;
    const category = {
      ...value,
      date,
      timestamps,
      id_author,
    };

    dispatch(addCategoriesAdminRequest({ category, reset }));
    handleCloseCategory();
  };
  return (
    <ModalBase onClose={handleCloseCategory} visible={showAddCategory}>
      <LayoutAdminModel onClick={handleCloseCategory}>
        <div className="p-10 bg-white">
          <Heading isHeading>Thêm loại</Heading>
          <form
            onSubmit={handleSubmit(handleAddCategory)}
            className="flex flex-col mb-10 text-center gap-y-10 mt-10"
          >
            <Field>
              <InputTextarea
                control={control}
                errors={errors}
                value=""
                name="title"
                placeholder="Nhập tiêu đề loại"
                type="text"
              >
                <BookmarkIcon />
              </InputTextarea>
            </Field>
            <div className="col-span-1 mb-10 md:col-span-2">
              <Label htmlFor={"image"}>Hình ảnh</Label>
              <FileInput
                control={control}
                name={"image"}
                errors={errors}
                lable={"Hình ảnh"}
              />
            </div>
            <Button type="submit" className="mx-auto ">
              Thêm loại
            </Button>
          </form>
        </div>
      </LayoutAdminModel>
    </ModalBase>
  );
};

export default AddCategoryAdmin;
