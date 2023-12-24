import React, { useEffect } from "react";
import { Button } from "../components/button";
import {
  CommentIcon,
  EmailIcon,
  LocationIcon,
  UserIcon,
} from "../components/Icon";

import ListPost from "../layout/posts/ListPost";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useToggle from "../hooks/useToggle";
import {
  customerDetailRequest,
  customersRequest,
} from "../sagas/customers/customersSlice";
import {
  NewspaperIcon
} from "@heroicons/react/24/outline";
import EditCustomer from "../layout/customers/EditCustomer";
import LoadingRequest from "../layout/loading/LoadingRequest";
import BannerCommon from "../layout/common/BannerCommon";
import { getPostsByCustomerRequest } from "../sagas/posts/postsSlice";
import { categoriesRequest } from "../sagas/categories/categoriesSlice";
import { setBreadcrumb } from "../sagas/global/globalSlice";
import useLoadingImage from "../hooks/useLoadingImage";
import ChangePassword from "../layout/customers/ChangePassword";
import PostItem from "../layout/posts/PostItem";

const InfoUser = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, customer_detail, error } = useSelector((state) => state.customers);
  const { token } = useSelector((state) => state.auth);
  const { handleToggle, toggle } = useToggle(false);
  const { loading: loadingPost, postsCustomer } = useSelector(
    (state) => state.posts
  );
  const { infoAuth } = useSelector((state) => state.auth);
  const id_customer = customer_detail?._id;
  const isAuth = id_customer === infoAuth?._id;
  const postByAuthActive = postsCustomer.filter((post) => post.status === 'approved')
  const dataPostCustomer = isAuth ? postsCustomer : postByAuthActive
  useEffect(() => {
    dispatch(getPostsByCustomerRequest({ id_customer }));
  }, [id_customer]);
  useEffect(() => {
    dispatch(customerDetailRequest({ slug }));
  }, [slug]);
  useEffect(() => {
    if (!loading && error?.message && Object?.keys(customer_detail).length < 1) {
      navigate('/not-found')
    }
  }, [loading, error, customer_detail]);
  useEffect(() => {
    dispatch(customersRequest());
    dispatch(categoriesRequest())
  }, [token]);
  useEffect(() => {
    document.title = customer_detail?.full_name
    dispatch(setBreadcrumb(customer_detail?.full_name))
  }, [customer_detail]);
  useLoadingImage(postsCustomer)
  return (
    <div className="relative bg-gray-50">
      <LoadingRequest show={loading}></LoadingRequest>
      <LoadingRequest show={loadingPost}></LoadingRequest>
      <ChangePassword />
      <div className="flex flex-col w-full h-auto gap-5 ">
        <BannerCommon
          className="bg-bottom "
          title={'Thông tin cá nhân'}
          image={customer_detail?.image}
        />
        <div
          className="page-content relative h-[240px] md:h-[120px] lg:h-[150px] flex justify-between bg-white
                    rounded-xl flex-col items-center"
        >
          <div className="absolute bottom-0 flex flex-col items-center w-full gap-5 p-5 -translate-x-1/2 md:flex-row left-1/2 md:left-0 md:translate-x-0 md:items-stretch lg:p-10">
            <div className="w-32 h-32 overflow-hidden rounded-full md:w-40 md:h-40 lg:w-52 lg:h-52">
              <img
                src={customer_detail?.image}
                className="object-cover w-full h-full "
                alt=""
              />
            </div>
            <div className="flex flex-col items-center justify-between flex-1 mt-auto gap-y-5 md:flex-row md:items-stretch">
              <div className="text-center md:text-start">
                <h1 className="text-xl font-medium uppercase md:text-2xl font-quicksand">
                  {customer_detail?.full_name}
                </h1>
                <span>@{customer_detail?.user_name}</span>
              </div>
              <div className="flex items-center gap-x-5">
                {!isAuth && token && (
                  <Link
                    className="flex items-center justify-center p-2 text-2xl text-white border-2 rounded-md cursor-pointer bg-primary border-primary"
                    to={"/message/" + id_customer}
                  >
                    <CommentIcon></CommentIcon>
                  </Link>
                )}
                {isAuth && (
                  <Button
                    onClick={handleToggle}
                    className="bg-transparent 
                                !text-primary font-medium border-primary"
                  >
                    Chỉnh sửa thông tin
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 page-content">
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex flex-col flex-1 pt-5 bg-white rounded-xl md:p-5 gap-y-10">
            <div className="grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3  gap-3">
              <div className="flex flex-col flex-auto h-auto p-5 bg-white rounded-xl gap-y-5">
                <h1 className="text-xl font-bold text-center text-primary md:text-start">
                  Thông tin cá nhân
                </h1>
                <div className="text-xs md:text-sm ">
                  <WrapInfo>
                    <UserIcon /> <p>{customer_detail?.full_name}</p>
                  </WrapInfo>
                  <WrapInfo>
                    <EmailIcon />{" "}
                    <p className="w-[80%]">
                      {customer_detail?.email || "Chưa có"}
                    </p>
                  </WrapInfo>
                  <WrapInfo>
                    <LocationIcon />{" "}
                    <p>{customer_detail?.address || "Chưa có"}</p>
                  </WrapInfo>
                  <WrapInfo>
                    <NewspaperIcon className="w-3 h-3 md:w-4 md:h-4" />{" "}
                    <p>{dataPostCustomer?.length || 'Chưa có'} bài viết</p>
                  </WrapInfo>
                </div>
              </div>
              {dataPostCustomer.length > 0
                ? dataPostCustomer?.map((item) => (
                  <PostItem key={item._id} data={item} isSingle isInfo={true} ></PostItem>
                ))
                : dataPostCustomer.length < 1
                && (<div className='text-center pb-10 col-span-2'>{'Không có bài viết nào'}</div>)
              }
            </div>
          </div>
        </div>
      </div>
      <EditCustomer
        data={customer_detail}
        show={toggle}
        onClick={handleToggle}
      ></EditCustomer>
    </div>
  );
};

export default InfoUser;

export const WrapInfo = ({ children }) => {
  return (
    <div className="flex items-center w-full py-4 break-words border-b gap-x-4 md:last:border-0">
      {children}
    </div>
  );
};
