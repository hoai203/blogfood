import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { query } from "../../axios-interceptor/query-api";

const Conversation = ({
  conversation,
  messages,
  // online,
  children,
  unRead,
  userId,
}) => {
  const { infoAuth } = useSelector((state) => state.auth);
  const { customers } = useSelector((state) => state.customers);
  const dispatch = useDispatch();
  const [lastestMessage, setLastestMessage] = useState(null);
  const [messageUnRead, setMessageUnRead] = useState([]);
  let { id } = useParams();
  if (!id) {
    id = "";
  }

  const friendId = conversation?.members?.find((m) => m !== infoAuth._id);
  let friend = {};
  friendId
    ? (friend = customers.find((f) => f._id === friendId))
    : (friend = customers.find((f) => f._id === userId));

  useEffect(() => {
    if (id === friendId) {
      const putMessage = async () => {
        try {
          const requests = messageUnRead.map((m) => {
            return query().messenger.readMessage({
              messageId: m._id,
              infoId: infoAuth._id,
            });
          });
          const responses = await Promise.all(requests);
        } catch (error) {
          console.error("Lỗi khi cập nhật tin nhắn:", error);
        }
      };

      putMessage();
    }
  }, [messageUnRead, lastestMessage]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await query().messenger.getMessages(conversation?._id);
        const lastIndex = res?.data?.length - 1;
        setLastestMessage(res?.data[lastIndex]);
        setMessageUnRead((prev) => {
          return res?.data?.filter((item) =>
            item?.isRead?.every((userId) => userId !== infoAuth?._id)
          );
        });
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [messages]);

  if (children) {
    return (
      <div className={"flex items-center p-2.5 transition-all duration-300"}>
        <NavLink
          to={`/info/${friend?.slug}`}
          className={"cursor-pointer hover:bg-blue-gray-100 rounded-lg p-2"}
        >
          <img src={friend?.image} alt="" className="w-10 h-10 rounded-[50%]" />
        </NavLink>
        <div className="relative flex flex-col flex-1 w-full">
          <span className="font-bold ">{friend?.full_name}</span>
          {friend?.online && <p className="line-clamp-1">{children}</p>}
          {!children && (
            <p className="line-clamp-1 ">
              {lastestMessage?.sender === infoAuth?._id ? "Bạn: " : null}
              {lastestMessage?.text}
            </p>
          )}
          {friend?.online && (
            <div className="absolute w-3 h-3 bg-green-600 rounded-full bottom-1 -left-5"></div>
          )}
          {unRead && (
            <div className="absolute right-0 w-3 h-3 -translate-y-1/2 bg-blue-600 rounded-full top-1/2"></div>
          )}
        </div>
      </div>
    );
  }

  return (
    <NavLink
      to={`/message/${conversation.members.find((m) => m !== infoAuth._id)}`}
      className={({ isActive }) =>
        isActive
          ? "bg-[#EBF5FF] flex items-center md:justify-start justify-center py-2.5 md:p-2.5 cursor-pointer  transition-all duration-300 rounded"
          : "hover:bg-gray-200 flex items-center md:justify-start justify-center py-2.5 md:p-2.5 cursor-pointer transition-all duration-300 rounded"
      }
    >
      <div className="flex-shrink-0 w-10 h-10 md:mr-5">
        <img
          src={friend?.image}
          alt=""
          className="object-cover rounded-[50%]  w-full h-full"
        />
      </div>
      <div className="relative flex-col hidden w-full md:flex">
        <span className="hidden font-bold sm:block whitespace-nowrap">
          {friend?.full_name}
        </span>
        {children && <p className="line-clamp-1">{children}</p>}
        {!children && (
          <p className="hidden md:line-clamp-1 md:block">
            {lastestMessage?.sender === infoAuth?._id ? "Bạn: " : ""}
            {lastestMessage?.text}
          </p>
        )}
        {friend?.online && (
          <div className="absolute w-3 h-3 bg-green-600 rounded-full bottom-1 -left-8"></div>
        )}
        {messageUnRead.length > 0 && (
          <div className="absolute right-0 w-3 h-3 p-2 text-white -translate-y-1/2 bg-blue-600 rounded-full top-1/2">
            <p className="absolute text-xs -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              {messageUnRead.length + 1 > 9 ? 9 + "+" : messageUnRead.length}
            </p>
          </div>
        )}
      </div>
    </NavLink>
  );
};

export default Conversation;
