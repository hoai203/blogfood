import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSetTitle from '../../hooks/useSetTitle';

const NotFound404 = () => {
    useSetTitle('404')
    const navigate = useNavigate();
    const handleBackPage = () => {
        navigate(-2)
    }
    return (
        <div>
            <div className=''>
                <div className="h-screen w-full flex justify-center items-center bg-white flex-col">
                    <h1 className="font-extrabold text-9xl text-[#1A2238] tracking-wide">
                        404
                    </h1>
                    <div className="bg-[#FF6A3D] text-sm px-2 rounded rotate-12 absolute">
                        Trang không tồn tại
                    </div>
                    <div className='flex gap-x-10'>
                        <button className="mt-5" onClick={handleBackPage}>
                            <div className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
                                <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0" />
                                <span className="relative block px-8 py-3 bg-white border border-current">
                                    <div>Quay lại</div>
                                </span>
                            </div>
                        </button>
                        <Link to="/" className="mt-5">
                            <div className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
                                <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0" />
                                <span className="relative block px-8 py-3 bg-white border border-current">
                                    <>Quay về trang chủ</>
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default NotFound404;