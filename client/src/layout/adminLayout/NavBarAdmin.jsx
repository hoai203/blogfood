import { useLocation, Link } from "react-router-dom";
import {
  Navbar, Typography, IconButton, Breadcrumbs, Input, Menu, MenuHandler, MenuList, MenuItem, Avatar, Badge
} from "@material-tailwind/react";
import {
  Bars3Icon,
  ClockIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ArrowUpTrayIcon,
  PencilSquareIcon,
  NoSymbolIcon,
  HeartIcon,
  ArchiveBoxXMarkIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearchAdmin, toggleSideBar } from "../../sagas/global/globalSlice";
import { useEffect, useState } from "react";
import { deleteAllNotificationAdminRequest, getNotificationByAdminRequest, getNotificationByAuthAdminRequest, getNotificationByCustomerRequest, updateNotificationAdminRequest, updateNotificationAuthAdminRequest } from "../../sagas/notification/notificationSlice";
import useTimeSince from "../../hooks/useTimeSince";
import { icon } from "../../ADMIN/routes";
import { PopoverDrop } from "../Popover";
import IconWrap from "../../components/Icon/IconWrap";
import { EyeOpenIcon, TrashIcon } from "../../components/Icon";


export function DashboardNavbar() {
  const dispatch = useDispatch()
  const fixedNavbar = true
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const { infoAdmin, tokenAdmin } = useSelector((state) => state.admin)
  const { notificationsAdmin, notificationsAuthAdmin } = useSelector((state) => state.notification)
  const { socketAdmin } = useSelector((state) => state.global)
  let totalNotificationActive = 0;
  let notificationIsActive = 0
  if (notificationsAdmin?.length > 0) {
    totalNotificationActive = notificationsAdmin.filter((noti) => noti.status === true).length;
  }
  if (notificationsAuthAdmin?.length > 0) {
    notificationIsActive = notificationsAuthAdmin.filter((noti) => noti.status === true).length;
  }
  const setOpenSidenav = () => {
    dispatch(toggleSideBar())
  }
  const handleGetNotification = () => {
    dispatch(getNotificationByAdminRequest());
  };
  const handleGetNotificationAuth = () => {
    if (tokenAdmin) {
      dispatch(getNotificationByAuthAdminRequest());
    }
  };
  const handleShowSearch = () => {
    dispatch(toggleSearchAdmin())
  }
  const handleUpdateAllNotification = () => {
    if (tokenAdmin && notificationsAdmin?.length > 0) {
      dispatch(updateNotificationAuthAdminRequest())
    }
  }
  const handleDeleteAllNotification = () => {
    if (tokenAdmin && notificationsAuthAdmin?.length > 0) {
      dispatch(deleteAllNotificationAdminRequest())
    }
  }
  useEffect(() => {
    handleGetNotification()
  }, [page]);
  useEffect(() => {
    if (socketAdmin) {
      socketAdmin.on("sendNotify", () => {
        setTimeout(() => {
          handleGetNotificationAuth();
        }, 500);
      });
    }
  }, [socketAdmin, notificationsAuthAdmin]);
  useEffect(() => {
    if (socketAdmin) {
      socketAdmin.on("notificationAdmin", () => {
        setTimeout(() => {
          handleGetNotification();
        }, 500);
      });
      socketAdmin.on('updateNotificationAdmin', () => {
        setTimeout(() => {
          dispatch(handleGetNotification())
        }, 200);
      })
    }
  }, [socketAdmin]);
  useEffect(() => {
    handleGetNotificationAuth();
  }, [location?.pathname]);
  let pages = "Thống kê"
  switch (page) {
    case 'posts':
      pages = 'Bài viết'
      break;
    case 'categories':
      pages = 'Danh mục'
      break;
    case 'customers':
      pages = 'Người dùng'
      break;
    case 'feedBack':
      pages = 'Phản hồi'
      break;
    case 'manage':
      pages = 'Quản lý'
      break;
    case 'comments':
      pages = 'Bình luận'
      break;
    case 'statistical':
      pages = 'Thống kê'
      break;
    default:
      break;
  }
  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${fixedNavbar
        ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
        : "px-0 py-1"
        }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
              }`}
          >
            <Link to={`/${layout}/statistical`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout || ''}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {pages}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {pages}
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <div className="block mr-4 cursor-pointer" onClick={handleShowSearch}>
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
          </div>
          <Menu>
            <MenuHandler>
              <div className="relative">
                <div className="absolute text-xs p-3 z-10 flex items-center justify-center bg-red-500 
                text-white -right-2 -top-3 rounded-full">
                  <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                    {notificationIsActive}</span>
                </div>
                <Avatar
                  src={infoAdmin?.image} size="sm"
                />
              </div>
            </MenuHandler>
            <MenuList
              className="w-max border-0 flex flex-col gap-y-3 max-h-[400px] min-w-[500px] overflow-y-auto overscroll-none">
              <div className="flex ">
                <div className=' font-bold text-base flex-1'>Thông báo</div>
                <div className='flex items-center gap-10'>
                  <div onClick={handleUpdateAllNotification} className='flex items-center'>
                    <IconWrap className='cursor-pointer'><EyeOpenIcon />
                      <p className='text-[10px] md:text-xs'>Đánh dấu xem tất cả</p></IconWrap>
                  </div>
                  <div onClick={handleDeleteAllNotification} className='cursor-pointer'>
                    <IconWrap><TrashIcon /> <p className='text-[10px] md:text-xs'>Xóa tất cả thông báo</p></IconWrap>
                  </div>
                </div>
              </div>

              {notificationsAuthAdmin && notificationsAuthAdmin?.length > 0 ?
                notificationsAuthAdmin?.map((notify) => (
                  <NotifyItem key={notify?._id + notify} notify={notify}></NotifyItem>
                ))
                : <div className='text-center'>Không có thông báo nào</div>
              }
            </MenuList>
          </Menu>
          <Menu>
            <MenuHandler>
              <div className="relative">
                <div className="absolute text-xs p-3 z-10 flex items-center justify-center bg-red-500 
                text-white -right-1 -top-2 rounded-full">
                  <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                    {totalNotificationActive}</span>
                </div>
                <IconButton variant="text" color="blue-gray" className="mx-1">
                  <BellIcon className="h-5 w-5 text-blue-gray-500" />
                </IconButton>
              </div>
            </MenuHandler>
            <MenuList
              className="w-max border-0 flex flex-col gap-y-3 max-h-[400px] overflow-y-auto overscroll-none">
              {notificationsAdmin && notificationsAdmin?.length > 0 ? notificationsAdmin?.map((notify) => (
                <NotifyItem key={notify?._id + notify} notify={notify}></NotifyItem>
              ))
                : <div className='text-center'>Không có thông báo nào</div>
              }
            </MenuList>
          </Menu>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden mr-4"
            onClick={setOpenSidenav}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}


export default DashboardNavbar;

const NotifyItem = ({ notify }) => {
  const timeSince = useTimeSince()
  const dispatch = useDispatch()
  const { customers, posts, admin } = useSelector((state) => state.admin);
  const infoCusSend = customers?.filter((cus) => cus._id === notify?.id_sender)[0]
  const infoADSend = admin?.filter((cus) => cus._id === notify?.id_sender)[0]
  const infoAuth = infoCusSend || infoADSend
  const handleUpdateNotification = () => {
    if (notify?.status === true) {
      dispatch(updateNotificationAdminRequest(notify?._id))
      setTimeout(() => {
        dispatch(getNotificationByAuthAdminRequest())
      }, 200);
    }
  }
  const id_post = notify?.id_post
  const infoPost = posts.find((post) => post._id === id_post)
  let title = ''
  let icons = <></>
  let className = ''
  const classIcon = "h-4 w-4 text-white"
  switch (notify?.typeNotify) {
    case 'createPost':
      title = <span> đã đăng bài viết <span className='font-bold text-primary'> {infoPost?.title}</span> </span>
      icons = <ArrowUpTrayIcon className={classIcon}></ArrowUpTrayIcon>
      className = 'bg-green-400'
      break;
    case 'editPost':
      title = 'Đã cập nhật lại bài viết'
      icons = <PencilSquareIcon className="h-3 w-3 "></PencilSquareIcon>
      className = 'bg-yellow-400 !text-black'
      break;
    case 'comment':
      icons = <ChatBubbleOvalLeftEllipsisIcon className={classIcon} />
      className = 'bg-green-400',
        title = <span>đã bình luận bài viết <span className='font-bold text-primary'> {infoPost?.title}</span> của bạn</span>
      break;
    case 'reply':
      icons = <ChatBubbleLeftRightIcon className={classIcon} />,
        className = 'bg-blue-400',
        title = <span>đã trả lời bình luận của bạn trong bài viết
          <span className='font-bold text-primary'> {infoPost?.title}</span></span>
      break;
    case 'approved':
      icons = <ArrowUpTrayIcon className={classIcon} />,
        className = 'bg-primary',
        title = <span>đã duyệt bài viết
          <span className='font-bold text-primary'> {infoPost?.title}</span> của bạn</span>
      break;
    case 'destroy':
      icons = <ArchiveBoxXMarkIcon className={classIcon} />,
        className = 'bg-red-600',
        title = <span>đã vô hiệu hóa bài viết
          <span className='font-bold text-primary'> {infoPost?.title} </span> của bạn</span>
      break;
    case 'like':
      icons = <HeartIcon className={classIcon} />,
        className = 'bg-red-400',
        title = <span>đã thích bài viết <span className='font-bold text-primary'>
          {infoPost?.title}</span></span>
      break;
    default:

      icons = <NoSymbolIcon className={classIcon} />,
        className = 'bg-black',
        title = <span>Thông báo không hợp lệ</span>
      break;
  }

  return (
    <Link to={`/admin/posts#id_post=${notify?.id_post}`}>
      <MenuItem className={`flex items-center gap-3 ${notify?.status ? 'bg-primary bg-opacity-10' : ''}`} onClick={handleUpdateNotification}>
        <div>
          <Badge
            content={icons}
            className={`${className} border-2 border-white shadow-lg shadow-black/20`}
            placement="bottom-end"
          >
            <Avatar
              src={infoAuth?.image}
              alt="item-1"
              size="md"
              variant="circular"
            />
          </Badge>
        </div>
        <div className="ml-5">
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-1 font-normal max-w-[400px]"
          >
            <strong>{infoAuth?.full_name}</strong> {title}
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="flex items-center gap-1 text-xs font-normal opacity-60"
          >
            <ClockIcon className="h-3.5 w-3.5" /> {timeSince(notify?.timestamps)}
          </Typography>
        </div>
      </MenuItem>
    </Link>
  )
}
