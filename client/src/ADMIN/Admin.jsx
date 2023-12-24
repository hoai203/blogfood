import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../layout/adminLayout/SideBarAdmin";
import DashboardNavbar from "../layout/adminLayout/NavBarAdmin";
import routes from "./routes";
import FooterAdmin from "../layout/adminLayout/FooterAdmin";
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import {
  PlusIcon,
  DocumentPlusIcon,
  FolderPlusIcon,
  UserPlusIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AddPostAdmin from "../layout/adminLayout/posts/AddPostAdmin";
import AddCategoryAdmin from "../layout/adminLayout/categories/AddCategoryAdmin";
import socketIOClient from "socket.io-client";
import {
  getAllAdminRequest,
  getCategoriesAdminRequest,
  getCustomersAdminRequest,
  getPostsAdminRequest,
  roleAdminRequest,
} from "../sagas/admin/adminSlice";
import {
  setSocketAdmin,
  toggleAddAdmin,
  toggleAddCategory,
  toggleAddCustomer,
  toggleAddPost,
} from "../sagas/global/globalSlice";
import AddCustomerAdmin from "../layout/adminLayout/customers/AddCustomerAdmin";
import AddAdmin from "../layout/adminLayout/admins/AddAdmin";
import PostDetailAdmin from "../layout/adminLayout/posts/PostDetailAdmin";
import PostEditAdmin from "../layout/adminLayout/posts/PostEditAdmin";
import BASE_URL from "../connect";
import SearchAdmin from "../layout/adminLayout/SearchAdmin";
import { FeedbackRequest } from "../sagas/feedbackMail/feedbacksSlice";
import CommentPostDetailAdmin from "../layout/adminLayout/comments/CommentPostDetailAdmin";
export function Dashboard() {
  const navLink = [
    {
      id: 1,
      title: "Thêm bài viết",
      icon: <DocumentPlusIcon className="w-5 h-5" />,
      onclick: () => {
        handleToggleAddPost();
      },
    },
    {
      id: 2,
      title: "Thêm loại",
      icon: <FolderPlusIcon className="w-5 h-5" />,
      onclick: () => {
        handleToggleCategory();
      },
    },
    {
      id: 3,
      title: "Thêm người dùng",
      icon: <UserPlusIcon className="w-5 h-5" />,
      onclick: () => {
        handleToggleCustomer();
      },
    },
    {
      id: 4,
      title: "Thêm nhân viên",
      icon: <UserCircleIcon className="w-5 h-5" />,
      onclick: () => {
        handleToggleAdmin();
      },
    },
  ];
  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className: `absolute top-2/4 w-[150px] text-white p-1 bg-primary/90 rounded-full
             -translate-y-2/4 -translate-x-3/4 font-normal  `,
  };
  const { tokenAdmin, infoAdmin, admin, role } = useSelector((state) => state.admin);
  const dataAdmin = admin?.find((ad) => ad._id === infoAdmin?._id);
  const roleAdmin = role?.find((ro) => ro.title === 'Admin');
  const isAdmin = dataAdmin?.role === roleAdmin?._id
  const { socketAdmin } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const handleToggleAddPost = () => {
    dispatch(toggleAddPost());
  };
  const handleToggleCategory = () => {
    dispatch(toggleAddCategory());
  };
  const handleToggleCustomer = () => {
    dispatch(toggleAddCustomer());
  };
  const handleToggleAdmin = () => {
    dispatch(toggleAddAdmin());
  };
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getPostsAdminRequest());
    dispatch(getCategoriesAdminRequest());
    dispatch(getCustomersAdminRequest());
    dispatch(getAllAdminRequest());
    dispatch(roleAdminRequest());
    dispatch(FeedbackRequest());
  }, [tokenAdmin]);
  useEffect(() => {
    if (!tokenAdmin) navigate("/admin/signin");
  }, [tokenAdmin]);
  useEffect(() => {
    if (tokenAdmin && infoAdmin) {
      dispatch(setSocketAdmin(socketIOClient(BASE_URL)));
    } else {
      dispatch(setSocketAdmin(null));
    }
  }, [tokenAdmin, infoAdmin]);
  useEffect(() => {
    if (tokenAdmin && infoAdmin && socketAdmin) {
      socketAdmin.emit("addUser", infoAdmin?._id, "admin");
    }
  }, [socketAdmin, infoAdmin, tokenAdmin]);
  useEffect(() => {
    const handleTabClose = () => {
      socketAdmin.emit("adminUnconnect", infoAdmin?._id);
    };
    window.addEventListener("beforeunload", handleTabClose);
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [socketAdmin]);
  return (
    <div className="min-h-screen bg-blue-gray-50/50 max-w-[1600px] mx-auto !relative">
      <Sidebar routes={routes} />
      <div className="flex flex-col min-h-screen p-4 xl:ml-80">
        <DashboardNavbar />
        <Outlet></Outlet>
        <div className="mt-auto text-blue-gray-600">
          <FooterAdmin />
        </div>
      </div>
      <div className="fixed bottom-10 right-10">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full bg-primary">
              <PlusIcon className="w-5 h-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent className="bg-white border rounded-full shadow-xl border-blue-gray-50 shadow-black/10">
            {navLink.map((nav) => (
              <SpeedDialAction
                onClick={nav.onclick}
                key={nav.id}
                className={`relative text-white bg-primary/90 ${!isAdmin && nav.id === 4 ? "hidden" : ""
                  }`}
              >
                {nav.icon}
                <Typography {...labelProps}>{nav.title}</Typography>
              </SpeedDialAction>
            ))}
          </SpeedDialContent>
        </SpeedDial>
      </div>
      <AddPostAdmin />
      <AddCategoryAdmin />
      <AddCustomerAdmin />
      <AddAdmin />
      <PostDetailAdmin />
      <CommentPostDetailAdmin />
      <PostEditAdmin />
      <SearchAdmin />
    </div>
  );
}

export default Dashboard;
