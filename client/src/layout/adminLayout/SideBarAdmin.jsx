import PropTypes from "prop-types";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { XMarkIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import {
    Avatar,
    Button,
    IconButton,
    Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar, toggleNavbar } from "../../sagas/global/globalSlice";

import { icon } from "../../ADMIN/routes";
import { startTransition } from "react";
import { setNotification } from "../../sagas/notification/notificationSlice";
import { logoutAdmin } from "../../sagas/admin/adminSlice";

export function Sidebar({ brandImg, brandName, routes }) {
    const { infoAdmin } = useSelector((state) => state.admin)
    const { socketAdmin } = useSelector((state) => state.global)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const sidenavTypes = {
        dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
        white: "bg-primary shadow-lg",
        transparent: "bg-transparent",
    };
    const { showSidebar } = useSelector((state) => state.global)
    const setOpenSidenav = () => {
        dispatch(closeSidebar())
    }
    const sidenavType = 'dark'
    const sidenavColor = 'white'
    const handleLogout = () => {
        const id = infoAdmin?._id
        startTransition(() => {
            socketAdmin.emit('adminUnconnect', id);
            dispatch(setNotification())
            dispatch(logoutAdmin({ id }));
            navigate('/admin/signin');
        });
    }
    return (
        <aside
            className={`${sidenavTypes['white']} ${showSidebar ? "translate-x-0" : "-translate-x-80"
                } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
        >
            <div
                className={`relative border-b ${sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
                    }`}
            >
                <Link to="/admin" className="flex items-center gap-4 py-6 px-8">
                    <Avatar src={infoAdmin?.image || brandImg} size="sm" />
                    <Typography
                        variant="h6"
                        color={sidenavType === "dark" ? "white" : "blue-gray"}
                    >
                        {infoAdmin?.full_name}
                    </Typography>
                </Link>
                <IconButton
                    variant="text"
                    color="white"
                    size="sm"
                    ripple={false}
                    className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
                    onClick={setOpenSidenav}
                >
                    <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
                </IconButton>
            </div>
            <div className="m-4">
                {routes.map(({ layout, pages }, key) => (
                    <ul key={key} className="mb-4 flex flex-col gap-1">
                        {pages.map(({ icon, name, path }) => (
                            <li key={name}>
                                <NavLink to={`/${layout}${path}`}>
                                    {({ isActive }) => (
                                        <Button
                                            variant={isActive ? "gradient" : "text"}
                                            color={
                                                isActive
                                                    ? sidenavColor
                                                    : sidenavType === "dark"
                                                        ? "white"
                                                        : "blue-gray"
                                            }
                                            className="flex items-center gap-4 px-4 capitalize"
                                            fullWidth
                                        >
                                            {icon}
                                            <Typography
                                                color="inherit"
                                                className="font-medium capitalize"
                                            >
                                                {name}
                                            </Typography>
                                        </Button>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
            <div className="m-4">
                <ul className="mb-4 flex flex-col gap-1">
                    <li >
                        <div>
                            <Button
                                variant={"text"}
                                color={"white"}
                                className="flex items-center gap-4 px-4 capitalize"
                                fullWidth
                                onClick={handleLogout}
                            >
                                <ArrowRightOnRectangleIcon {...icon} />
                                <Typography
                                    color="inherit"
                                    className="font-medium capitalize"
                                >
                                    Đăng xuất
                                </Typography>
                            </Button>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

Sidebar.defaultProps = {
    brandImg: "../src/assets/image/user.png",
    brandName: "FOODSVIET",
};

Sidebar.propTypes = {
    brandImg: PropTypes.string,
    brandName: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidebar;
