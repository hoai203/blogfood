import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
const Breadcrumb = () => {

    const { pathname } = useLocation();
    const [layout, page] = pathname.split("/").filter((el) => el !== "");
    let nameLayout = ''

    switch (layout) {
        case 'posts':
            nameLayout = 'Bài Viết'
            break;
        case 'detail':
            nameLayout = 'Nội dung bài viết'
            break;
        case 'categories':
            nameLayout = 'Danh mục'
            break;
        case 'about':
            nameLayout = 'Về FoodsViet'
            break;
        case 'contact':
            nameLayout = 'Liên hệ'
            break;
        case 'info':
            nameLayout = 'Thông tin cá nhân'
            break;
        case 'add-post':
            nameLayout = 'Tạo bài viết'
            break;
        default:
            break;
    }
    const className = " flex items-center last:after:content-[''] after:content-['/'] after:px-3 last:after:px-0"
    const { breadcrumb } = useSelector((state) => state.global)
    return (
        <div
            className={`bg-transparent uppercase !text-white flex items-center text-[11px] md:text-sm
            justify-center p-0 transition-all`}
        >
            <Link to={`/`} className={className}>
                <p

                    className="text-white font-normal">
                    Trang Chủ
                </p>
            </Link>
            <Link to={layout === 'detail' || layout === 'info' ? `#` : `/${layout}`} className={className}>
                <p

                    className="text-white font-bold"
                >
                    {nameLayout || ''}
                </p>
            </Link>
            {page &&
                <p

                    className="text-white font-bold"
                >
                    {breadcrumb?.slice(0, 50)}{breadcrumb?.length > 50 ? ' ...' : ''}
                </p>
            }

        </div>
    );
};

export default Breadcrumb;



