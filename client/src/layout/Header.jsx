import React, { useEffect, useState } from "react";
import Logo from "../components/logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import { BellIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import Setting from "./Setting";
import Search from "./Search";
import Avatar from "./customers/Avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleNavbar,
  toggleSearch,
  toggleSetting,
  closeNavbar,
  closeSearch,
  closeSetting,
  toggleNotification,
  closeNotification,
} from "../sagas/global/globalSlice";
import { Link, useLocation } from "react-router-dom";
import { SearchIcon } from "../components/Icon";
import { Badge } from "@material-tailwind/react";
import { getNotificationByCustomerRequest } from "../sagas/notification/notificationSlice";
import Notification from "./Notification";
import {
  conversationsRequest,
  messageUnReadRequest,
} from "../sagas/messenger/messengerSlice";
import { postsRequest } from "../sagas/posts/postsSlice";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { showNavbar } = useSelector((state) => state.global);
  const { infoAuth, token } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.global);
  const { customers } = useSelector((state) => state.customers);
  const { notifications } = useSelector((state) => state.notification);
  const { messageUnRead, conversations } = useSelector(
    (state) => state.messenger
  );
  const [notificationIsActive, setNotificationIsActive] = useState(0);
  const dataAuth = customers.filter((cus) => cus._id === infoAuth?._id)[0];
  const handleGetNotification = () => {
    if (token) {
      dispatch(getNotificationByCustomerRequest());
    }
  };
  const handleGetNotificationMessage = () => {
    if (token) {
      dispatch(messageUnReadRequest({ conversations, infoId: infoAuth?._id }));
    }
  };
  const handleToggleNotification = () => {
    dispatch(toggleNotification());
    dispatch(closeNavbar());
    dispatch(closeSearch());
    dispatch(closeSetting());
  };
  const handleShowNavbar = () => {
    dispatch(toggleNavbar());
    dispatch(closeNotification());
    dispatch(closeSearch());
    dispatch(closeSetting());
  };
  const handleShowSearch = () => {
    dispatch(closeNotification());
    dispatch(toggleSearch());
    dispatch(closeNavbar());
    dispatch(closeSetting());
  };
  const handleShowSetting = () => {
    dispatch(closeNotification());
    dispatch(toggleSetting());
    dispatch(closeNavbar());
    dispatch(closeSearch());
  };
  useEffect(() => {
    dispatch(closeNotification());
    dispatch(closeNavbar());
    dispatch(closeSearch());
    dispatch(closeSetting());
  }, [location?.pathname, dispatch]);
  useEffect(() => {
    handleGetNotification();
  }, [location?.pathname, token]);

  useEffect(() => {
    if (socket) {
      socket.on("sendNotify", () => {
        setTimeout(() => {
          handleGetNotification();
        }, 500);
      });
      socket.on("getNotifyMessage", () => {
        setTimeout(() => {
          handleGetNotificationMessage();
        }, 200);
      });
    }
    if (notifications?.length > 0) {
      const total = notifications.filter((noti) => noti.status === true).length;
      setNotificationIsActive(total);
    } else {
      setNotificationIsActive(0);
    }
  }, [socket, notifications]);

  useEffect(() => {
    dispatch(closeNotification());
    dispatch(closeNavbar());
    dispatch(closeSearch());
    dispatch(closeSetting());
  }, [location?.pathname, dispatch]);
  useEffect(() => {
    handleGetNotification();
  }, [location?.pathname, token]);
  const [isScroll, setIsScroll] = useState(false);
  useEffect(() => {
    const handleScrollbar = () => {
      setIsScroll(window.scrollY >= 50);
    };
    window.addEventListener("scroll", handleScrollbar);
    return () => {
      window.removeEventListener("scroll", handleScrollbar);
    };
  }, []);

  useEffect(() => {
    if (infoAuth?._id) {
      dispatch(conversationsRequest({ userId: infoAuth?._id }));
    }
  }, [infoAuth?._id]);
  useEffect(() => {
    handleGetNotificationMessage();
  }, [location?.pathname, infoAuth, conversations]);
  return (
    <div
      className={`fixed  top-0 left-0 right-0 z-[10] duration-300 
        ${isScroll ? "bg-white text-black shadow-3xl" : "lg:text-white"}`}
    >
      <Search></Search>
      <div className="relative flex items-center justify-between px-2 py-3 page-content md:px-3 lg:px-2">
        <div className="z-[10]">
          <Logo></Logo>
        </div>
        <Navbar></Navbar>
        <Notification> </Notification>
        <Setting></Setting>
        <div className="flex items-center gap-3 lg:gap-5 z-[10]">
          <span
            className={`text-2xl  font-thin flex justify-center items-center cursor-pointer
                     ${isScroll ? "!text-black " : "!text-white"}`}
            onClick={handleShowSearch}
          >
            <SearchIcon />
          </span>
          {
            token && infoAuth &&
            <>
              <div onClick={handleToggleNotification} className="cursor-pointer">
                {notificationIsActive > 0 ? (
                  <Badge content={notificationIsActive} overlap="circular">
                    <div
                      className={`pt-1 pr-1
                          ${isScroll ? " !text-blue-700 " : " !text-white"}`}
                    >
                      <BellIcon className="w-6 h-6 " />
                    </div>
                  </Badge>
                ) : (
                  <div
                    className={`
                              ${isScroll ? " !text-gray-600 " : " !text-white"}`}
                  >
                    <BellIcon className="w-6 h-6 " />
                  </div>
                )}
              </div>

              <Link to={"/message/"}>
                {messageUnRead?.length > 0 ? (
                  <Badge content={messageUnRead.length} overlap="circular">
                    <div
                      className={`pt-1 pr-1
                              ${isScroll ? " !text-gray-600 " : " !text-white"}`}
                    >
                      <ChatBubbleOvalLeftIcon className="w-6 h-6 " />
                    </div>
                  </Badge>
                ) : (
                  <div
                    className={`
                              ${isScroll ? " !text-gray-600 " : " !text-white"}`}
                  >
                    <ChatBubbleOvalLeftIcon className="w-6 h-6 " />
                  </div>
                )}
              </Link>
            </>
          }
          <Avatar onClick={handleShowSetting} image={dataAuth?.image}></Avatar>
          <div className="cursor-pointer lg:hidden" onClick={handleShowNavbar}>
            <FontAwesomeIcon
              className={` ${showNavbar ? "text-2xl" : "text-xl"} 
                        ${isScroll ? "!text-black " : "!text-white"}`}
              icon={showNavbar ? faXmark : faBars}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;
