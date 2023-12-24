import {
  HomeIcon,
  NewspaperIcon,
  Square3Stack3DIcon,
  UserIcon,
  EnvelopeOpenIcon,
  ShieldCheckIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChartBarIcon
} from "@heroicons/react/24/solid";
export const icon = {
  className: "w-5 h-5 text-inherit",
};
const routes = [
  {
    layout: "admin",
    pages: [
      {
        icon: <ChartBarIcon {...icon} />,
        name: "Thống kê",
        path: "/statistical",
      },
      {
        icon: <NewspaperIcon {...icon} />,
        name: "Bài viết",
        path: "/posts",
      },
      {
        icon: <Square3Stack3DIcon {...icon} />,
        name: "Loại",
        path: "/categories",
      },
      {
        icon: <UserIcon {...icon} />,
        name: "Người dùng",
        path: "/customers",
      },
      {
        icon: <EnvelopeOpenIcon {...icon} />,
        name: "Phản hồi",
        path: "/feedBack",
      },
      {
        icon: <ShieldCheckIcon  {...icon} />,
        name: "Quản lý",
        path: "/manage",
      },
    ],
  }
];

export default routes;
