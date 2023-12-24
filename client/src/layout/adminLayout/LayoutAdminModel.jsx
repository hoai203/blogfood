import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const LayoutAdminModel = ({ children, onClick = () => { }, className = '', z = 999 }) => {
  return (
    <div
      className={` fixed top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2  
            h-full w-full  mx-auto  z-[${z}] rounded-sm overflow-hidden !max-w-[90%] !max-h-[90%] ${className} `}>
      <div className="zoom bg-blue-gray-50 h-full overflow-y-auto transition-all overscroll-none md:p-5 p-1">
        <div
          className="absolute z-[99]  text-2xl cursor-pointer top-2 right-5 text-primary"
          onClick={onClick}
        >
          <FontAwesomeIcon icon={faXmark} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default LayoutAdminModel;
