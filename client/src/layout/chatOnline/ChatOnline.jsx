const ChatOnline = () => {
  return (
    <div className="mt-2.5">
      <div className="flex items-center font-medium cursor-pointer chatOnlineFriend">
        <div className="relative ">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="w-8 h-8 rounded-full mr-2.5 object-cover"
          />
          <div className="chatOnlBaged absolute w-2.5 h-2.5 bg-green-600 rounded-full bottom-[2px] right-[9px]"></div>
        </div>
        <span className="chatOnlName">Chương</span>
      </div>
    </div>
  );
};

export default ChatOnline;
