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
import { Select } from "../../../components/select";
import { Label } from "../../../components/label";
import { Textarea } from "../../../components/textarea";
import { Button } from "../../../components/button";
import LayoutAdminModel from "../LayoutAdminModel";
import { updatePostAdminRequest } from "../../../sagas/admin/adminSlice";
import { closeDetailPost, closeUpdatePost } from "../../../sagas/global/globalSlice";

const schemaValidate = Yup.object({
  title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  content: Yup.string().required("Vui lòng nhập nội dung!"),
  image: Yup.mixed(),
});

const PostEditAdmin = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    control,

  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onBlur" });
  const { postDetail, categories } = useSelector((state) => state.admin);
  const { showUpdatePost } = useSelector((state) => state.global);
  const handleClose = () => {
    dispatch(closeUpdatePost())
  }
  const handleSubmits = (value) => {
    try {
      const post = { ...value };
      dispatch(updatePostAdminRequest({ id: postDetail._id, post, slug: postDetail.slug }));
      handleClose();
      dispatch(closeDetailPost())
      resetImageField();
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  const resetImageField = () => {
    setValue("image", "");
  };
  useEffect(() => {
    if (postDetail) {
      setValue("title", postDetail.title);
      setValue("category", postDetail.category);
      setValue("content", postDetail.content);
    }
  }, [postDetail, setValue]);
  return (
    <ModalBase onClose={handleClose} visible={showUpdatePost}>
      <LayoutAdminModel onClick={handleClose}>
        <div className="p-2 md:p-5">
          <form
            onSubmit={handleSubmit(handleSubmits)}
            className="mb-10 text-center p-2 md:p-5 bg-white"
          >
            <Heading isHeading>Chỉnh sửa bài viết </Heading>
            <div className="grid grid-cols-1  gap-10 pt-10 mb-10">
              <Field>
                <InputTextarea
                  control={control}
                  errors={errors}
                  value={postDetail?.title}
                  name="title"
                  placeholder="Nhập tiêu đề bài viết"
                  type="text"
                >
                  <BookmarkIcon />
                </InputTextarea>
              </Field>
              <Field>
                <Select
                  value={postDetail?.category}
                  data={categories}
                  control={control}
                  name={"category"}
                />
              </Field>
              <Field className=" col-span-1 mb-10">
                <Label htmlFor={"image"}>Hình ảnh</Label>
                <FileInput
                  oldImage={postDetail?.image}
                  control={control}
                  name={"image"}
                  errors={errors}
                  lable={"Hình ảnh"}
                />
              </Field>
              <Field>
                <Label htmlFor={"content"}>Nội dung</Label>
                <Textarea
                  value={postDetail?.content}
                  control={control}
                  errors={errors}
                  name={"content"}
                />
              </Field>
            </div>
            <Button type="submit" className=" mx-auto">
              Sửa bài viết
            </Button>
          </form>
        </div>
      </LayoutAdminModel>
    </ModalBase>
  );
};

export default PostEditAdmin;
