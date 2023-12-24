// MainLayout.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { setNotify } from "../sagas/comments/commentsSlice";
import { customersRequest } from "../sagas/customers/customersSlice";
import { setErrorGlobal, setNotifyGlobal } from "../sagas/global/globalSlice";
import Footer from "./Footer";
import Header from "./Header";

import { postsRequest } from "../sagas/posts/postsSlice";
import {
  conversationsRequest,
  messagesRequest,
} from "../sagas/messenger/messengerSlice";
import { categoriesRequest } from "../sagas/categories/categoriesSlice";
import useLoadingImage from "../hooks/useLoadingImage";
import useCheckAuth from "../hooks/useCheckAuth";
import { getAllAdminRequest, getPostsAdminRequest } from "../sagas/admin/adminSlice";
import EditPost from "./posts/EditPost";

function MainLayout() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { token, infoAuth } = useSelector((state) => state.auth);
  const tokenLocal = localStorage.getItem("authToken");
  const { socket } = useSelector((state) => state.global);
  const { posts } = useSelector((state) => state.posts);
  const { customers } = useSelector((state) => state.customers);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(customersRequest());
    dispatch(categoriesRequest());
    dispatch(postsRequest());
    dispatch(setNotify());
    dispatch(getPostsAdminRequest())
    dispatch(getAllAdminRequest());
    dispatch(setErrorGlobal(""));
    dispatch(setNotifyGlobal(""));
  }, [token, dispatch, tokenLocal, location?.pathname]);
  useEffect(() => {
    const handleTabClose = () => {
      socket.emit('userUnconnect', infoAuth?._id);
    };
    window.addEventListener('beforeunload', handleTabClose);
    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, [socket]);
  useLoadingImage(posts)
  useLoadingImage(customers)
  useLoadingImage(categories)
  useCheckAuth()
  return (
    <div className="relative min-h-[1000px] max-w-[1600px] m-auto flex flex-col overflow-hidden ">
      <Header />
      <Outlet />
      <Footer />
      <>
        <EditPost />
      </>
    </div>
  );
}

export default MainLayout;
