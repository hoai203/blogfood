import React, { useEffect } from "react";
import ModalBase from "../../modal/ModalBase";
import {
  Typography,
  Card,
  CardBody,
  Avatar,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  AtSymbolIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  Squares2X2Icon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { icon } from "../../../ADMIN/routes";
import LayoutAdminModel from "../LayoutAdminModel";
import { useDispatch, useSelector } from "react-redux";
import { WrapInfo } from "../../../pages/InfoUser";
import { closeShowComment, toggleUpdatePost } from "../../../sagas/global/globalSlice";
import { createCommentsAdminRequest, getcommentsByPostRequest } from "../../../sagas/comments/commentsSlice";
import CommentItem from "../../comments/CommentItem";
import CommentAdminItem from "./CommentAdminItem";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup";
import { getDate, getTimestamp } from "../../../hooks/useGetTime";
import { toast } from 'react-toastify';
import { Input } from "../../../components/input";
import { CommentIcon } from "../../../components/Icon";
import { ButtonComment } from "../../../components/button";
import { updateStatusRequest } from "../../../sagas/admin/adminSlice";
import SpeedDialAdmin from "../SpeedDialAdmin";
const schemaValidate = Yup.object({
  content: Yup.string().required("Vui lòng nhập nội dung!"),
})

const CommentPostDetailAdmin = () => {
  const dispatch = useDispatch();
  const { handleSubmit, formState: { errors, isSubmitting, isValid }, control, reset } =
    useForm({ resolver: yupResolver(schemaValidate), mode: 'onChange', })
  const handleResetForm = () => {
    reset()
  }
  const { postDetail, customerDetail, categoryDetail, tokenAdmin, infoAdmin } = useSelector((state) => state.admin)
  const { showDetailComment, socketAdmin } = useSelector((state) => state.global)
  const { commentsPost } = useSelector((state) => state.comments);
  const totalComment = commentsPost?.length || 0
  const rootComment = commentsPost?.filter(comment => comment?.parent_comment_id === '')
  const getReplies = (commentId) => {
    return commentsPost?.filter(commentByPost => commentByPost?.parent_comment_id === commentId)
  }
  const id_post = postDetail?._id
  const id_customer = postDetail?.id_customer;
  const handleClose = () => {
    dispatch(closeShowComment())
  }
  const handleSendNotification = async (id_receiver) => {
    if (socketAdmin)
      await socketAdmin.emit('receiverNotify', { id_receiver });
  }
  const handleUpdateStatus = (status) => {
    const model = "post";
    const id = postDetail?._id;
    dispatch(updateStatusRequest({ id, model, status, handleSendNotification }));
    handleClose()
  };
  const handleEditPost = () => {
    dispatch(toggleUpdatePost());
  };
  const handleComment = (value) => {
    if (isValid) {
      const date = getDate()
      const timestamps = getTimestamp()
      const id_receiver = id_customer;
      const id_sender = infoAdmin?._id
      const comment = {
        ...value,
        id_post,
        date,
        timestamps
      }
      dispatch(createCommentsAdminRequest({ comment, id_post, id_receiver, id_sender, typeNotify: 'comment' }))
      if (infoAdmin?._id !== id_customer && socketAdmin) {
        socketAdmin.emit('receiverNotify', { id_receiver })
        socketAdmin.emit('update')
      } else {
        socketAdmin.emit('update')
      }
      handleResetForm()
    } else {
      toast.error('Nhập nội dung trước khi bình luận')
    }
  }
  useEffect(() => {
    dispatch(getcommentsByPostRequest({ id_post }))
  }, [id_post]);
  useEffect(() => {
    if (socketAdmin && id_post) {
      socketAdmin.on('update', () => {
        setTimeout(() => {
          dispatch(getcommentsByPostRequest({ id_post }))
        }, 200);
      })
    }
  }, [socketAdmin, id_post]);
  return (
    <>
      <ModalBase onClose={handleClose} visible={showDetailComment}>
        <LayoutAdminModel onClick={handleClose}>
          <div
            className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-cover	bg-center"
            style={{ backgroundImage: `url(${postDetail?.image})` }}
          >
            <div className="absolute inset-0 h-full w-full bg-black/30" >
            </div>
          </div>
          <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
            <CardBody className="p-4">
              <div className="mb-1 flex items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <Avatar
                    src={postDetail?.image}
                    alt="bruce-mars"
                    size="xl"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {postDetail?.title || ''}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                    >
                      {categoryDetail?.title || ''}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className=' flex-auto h-auto bg-white rounded-xl p-5 flex gap-x-10 flex-col md:flex-row
                         md:gap-y-10'>
                <div className='text-xs md:text-sm flex-1'>
                  <WrapInfo>
                    <UserCircleIcon {...icon} /> <p>{customerDetail?.full_name} </p>
                  </WrapInfo>
                  <WrapInfo>
                    <AtSymbolIcon {...icon} /> <p>{customerDetail?.user_name}</p>
                  </WrapInfo>
                  <WrapInfo>
                    <TagIcon {...icon} />  <p>{customerDetail?.admin ? 'Quản trị viên' : 'Người dùng'}</p>
                  </WrapInfo>
                </div>
                <div className='text-xs md:text-sm flex-1'>
                  <WrapInfo>
                    <Squares2X2Icon {...icon} /> <p>{categoryDetail?.title}</p>
                  </WrapInfo>
                  <WrapInfo>
                    <HeartIcon {...icon} /> <p>{postDetail?.likes?.length} lượt thích</p>
                  </WrapInfo>
                  <WrapInfo>
                    <ChatBubbleLeftRightIcon  {...icon} /> <p>{totalComment} bình luận</p>
                  </WrapInfo>
                </div>
              </div>
              <div className="px-4 pb-4 ">
                <div className="text-xs leading-6 md:text-sm lg:text-base">
                  <Tabs value="content">
                    <TabsHeader>
                      <Tab value={'content'}>
                        <div className="flex items-center gap-2">
                          Nội dung bài viết
                        </div>
                      </Tab>
                      <Tab value={'comment'}>
                        <div className="flex items-center gap-2">
                          Quản lý bình luận
                        </div>
                      </Tab>
                    </TabsHeader>
                    <TabsBody className=" font-medium !font-content">
                      <TabPanel value='comment'>
                        <div className='my-5'>
                          {tokenAdmin && <div className='mt-5 lg:mb-10 w-full bg-white py-3 px-2'>
                            <form onSubmit={handleSubmit(handleComment)} autoComplete='off'
                              className='flex items-center gap-x-4'>
                              <div className='flex-1'>
                                <Input name={'content'} control={control} errors={errors} value=''
                                  type='text' placeholder='Nhập nội dung bình luận' >
                                  <CommentIcon></CommentIcon>
                                </Input>
                              </div>
                              <ButtonComment isLoading={isSubmitting} />
                            </form>
                          </div>}
                          {rootComment?.length > 0 && rootComment.map(comment => (
                            <CommentAdminItem key={comment._id} comment={comment} replies={getReplies}
                              id_post={id_post} id_customer_post={postDetail?.id_customer}></CommentAdminItem>
                          ))}
                          {rootComment?.length < 1 && (<p className='text-sm text-center'>Chưa có bình luận nào!</p>)}
                        </div>
                      </TabPanel>
                      <TabPanel value='content'>
                        <div className="text-xs leading-6 md:text-sm lg:text-base">
                          <div
                            dangerouslySetInnerHTML={{ __html: postDetail?.content }}
                            className="content_post !text-xs !font-medium"
                          />
                        </div>
                      </TabPanel>
                    </TabsBody>
                  </Tabs>
                </div>
              </div>
            </CardBody>
          </Card>
          <SpeedDialAdmin
            detail={postDetail} handleEdit={handleEditPost} handleUpdateStatus={handleUpdateStatus}
            idEntity={postDetail?.id_customer} />
        </LayoutAdminModel>
      </ModalBase>
    </>
  );
};
export default CommentPostDetailAdmin;
