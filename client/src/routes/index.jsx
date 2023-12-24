import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "../layout/MainLayout";
import NotFound404 from "../pages/not-found/NotFound404";
import ScrollToTop from "../layout/common/ScrollToTop";
import Admin from "../ADMIN/Admin";
import MessagePage from "../pages/MessagePage";
import FeedBackPageAdmin from "../pages/adminPage/FeedBackPageAdmin";
import PasswordReset from "../pages/PasswordReset";
import ForgotPassword from "../pages/ForgotPassword";
import ForgotPasswordAdmin from "../pages/adminPage/ForgotPasswordAdmin";
const CommentPostPageAdmin = lazy(() => import("../pages/adminPage/CommentPostPageAdmin"));
const HomeAdmin = lazy(() => import("../pages/adminPage/HomeAdmin"));

const PostPageAdmin = lazy(() => import("../pages/adminPage/PostPageAdmin"));
const CustomersPageAdmin = lazy(() =>
  import("../pages/adminPage/CustomerPageAdmin")
);
const CategoryPageAdmin = lazy(() =>
  import("../pages/adminPage/CategoryPageAdmin")
);

const SignInPageAdmin = lazy(() =>
  import("../pages/adminPage/SignInPageAdmin")
);
const RetsetPasswordAdmin = lazy(() =>
  import("../pages/adminPage/RetsetPasswordAdmin")
);

const PageAdmin = lazy(() => import("../pages/adminPage/PageAdmin"));

const AboutPage = lazy(() => import("../pages/AboutPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const InfoUser = lazy(() => import("../pages/InfoUser"));
const DetailPage = lazy(() => import("../pages/DetailPage"));
const SignInSignUp = lazy(() => import("../pages/SignInSignUp"));
const PostPage = lazy(() => import("../pages/PostPage"));
const ListPostsByCategory = lazy(() => import("../pages/ListPostsByCategory"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const AddNewPosts = lazy(() => import("../pages/AddNewPosts"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppCustomer />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/categories", element: <CategoryPage /> },
      { path: "/info/:slug", element: <InfoUser /> },
      { path: "/detail/:slug", element: <DetailPage /> },
      { path: "/categories/:slug", element: <ListPostsByCategory /> },
      { path: "/info-user/:id", element: <InfoUser /> },
      { path: "/posts", element: <PostPage /> },
      { path: "/add-post", element: <AddNewPosts /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
  { path: "/message/:id?", element: <MessagePage /> },
  { path: "/signin", element: <SignInSignUp /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <PasswordReset /> },
  { path: "/not-found", element: <NotFound404 /> },
  { path: "*", element: <NotFound404 /> },
  {
    path: "/admin",
    element: <AppAdmin />,
    children: [
      { path: "", element: <HomeAdmin /> },
      { path: "statistical", element: <HomeAdmin /> },
      { path: "posts", element: <PostPageAdmin /> },
      { path: "categories", element: <CategoryPageAdmin /> },
      { path: "customers", element: <CustomersPageAdmin /> },
      { path: "comments", element: <CommentPostPageAdmin /> },
      { path: "feedBack", element: <FeedBackPageAdmin /> },
      { path: "manage", element: <PageAdmin /> },
    ],
  },
  { path: "admin/signin", element: <SignInPageAdmin /> },
  { path: "admin/reset-password", element: <RetsetPasswordAdmin /> },
  { path: "admin/forgot-password", element: <ForgotPasswordAdmin /> },
]);
function AppCustomer() {
  return (
    <>
      <ScrollToTop />
      <MainLayout />
    </>
  );
}
function AppAdmin() {
  return (
    <>
      <ScrollToTop />
      <Admin />
    </>
  );
}
