import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useTimeSince from "../../hooks/useTimeSince";

const Message = ({ own, message }) => {
  const timeSince = useTimeSince();
  const { customers } = useSelector((state) => state.customers);
  const user = customers.find((u) => u._id === message.sender);
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };
  return (
    <div className={`flex flex-col  ${own ? "items-end" : ""} `}>
      <div
        className={`flex ${own ? "flex-row-reverse" : ""} items-center gap-x-3`}
      >
        <NavLink
          to={`/info/${user?.slug}`}
          className={"cursor-pointer w-8 h-8"}
        >
          <img
            src={user?.image}
            className="object-cover w-full h-full rounded-full"
            alt=""
          />
        </NavLink>
        <div
          className={`p-2.5 text-white md:max-w-[350px] max-w-[300px] my-2.5 ${own
            ? "bg-[#1877f2] rounded-tl-xl rounded-tr-xl rounded-bl-xl"
            : "bg-gray-500 rounded-tl-xl rounded-tr-xl rounded-br-xl"
            }`}
        >
          <p className="pb-2 text-base break-words">
            {message?.text.length > 200 ? (
              <>
                {showFullText ? (
                  <>{message?.text}</>
                ) : (
                  <>{message?.text.slice(0, 200) + " "}</>
                )}
                <button onClick={toggleText}>
                  {showFullText ? "thu gọn" : "xem thêm"}
                </button>
              </>
            ) : (
              <>{message?.text}</>
            )}
          </p>
          {/* <p className="pb-2 text-base break-words">{message?.text}</p> */}

          <div className="text-xs">
            {timeSince(message?.timestamps || Date.now())}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
