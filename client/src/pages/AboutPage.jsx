/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "../components/Icon";
import BannerCommon from "../layout/common/BannerCommon";
import useSetTitle from "../hooks/useSetTitle";
const teamMembers = [
  {
    id: 1,
    img: "../src/assets/image/son.jpg",
    name: "Nguyễn Trường Sơn",
    position: "Nhóm trưởng",
  },
  {
    id: 2,
    img: "../src/assets/image/chuong.jpg",
    name: "Nguyễn Văn Chương",
    position: "Thành viên",
  },
  {
    id: 3,
    img: "../src/assets/image/thu.jpg",
    name: "Lê Minh Thư",
    position: "Thành viên",
  },
  {
    id: 4,
    img: "../src/assets/image/hoai.jpg",
    name: "Nguyễn Văn Hoài",
    position: "Thành viên",
  },
];
const AboutPage = () => {
  useSetTitle("Về FoodsViet");
  return (
    <div className="bg-white ">
      <BannerCommon
        image={"../src/assets/image/banner-post.jpg"}
        title="Về FOODSVIET"
      />
      <div className="py-5">
        <div className="grid h-full grid-cols-2 px-5">
          <div className="flex-1 col-span-2 lg:col-span-1">
            <div className="grid grid-cols-2 gap-2">
              <img
                src="../src/assets/image/banner8.jpg"
                alt=""
                className="w-full rounded-lg"
              />
              <img
                src="../src/assets/image/homemade-ramen-soup-with-half-egg-flat-lay.jpg"
                alt=""
                className="w-4/5 mt-auto rounded-lg"
              />
              <img
                src="../src/assets/image/pixzolo-photography-Qtd5z7g4thc-unsplash.jpg"
                alt=""
                className="w-5/6 ml-auto rounded-lg "
              />
              <img
                src="../src/assets/image/banner3.jpg"
                alt=""
                className="w-full rounded-lg"
              />
            </div>
          </div>

          <div className="flex items-center flex-1 w-full h-full col-span-2 p-8 lg:col-span-1">
            <div>
              <h5 className="relative inline-block pr-4 text-3xl font-extrabold text-primary font-dancing">
                Về FoodsViet
                <span className="absolute left-full border w-[100px] top-1/2 -translate-y-1/2 h-[1px] border-primary"></span>
              </h5>
              <h1 className="mb-5 text-4xl font-bold ">
                Chào mừng đến với <span className="text-primary">||</span>{" "}
                FoodvietBlog
              </h1>
              <p className="mb-4 text-base">
                Chào mừng các bạn đến với "Ẩm Thực Việt Blog" - nơi hội tụ những
                trải nghiệm ẩm thực đậm chất Việt Nam! Chúng tôi tự hào mang đến
                cho bạn những câu chuyện ngon lành, từng miếng thức ăn là một
                hành trình khám phá vô tận về văn hóa ẩm thực đặc sắc của đất
                nước chúng ta.
              </p>
              <p className="mb-4 text-base">
                Tại đây, bạn sẽ được đắm chìm trong thế giới đa dạng của các món
                ngon, từ những món truyền thống đậm hương vị quê hương đến những
                sáng tạo mới lạ, mang đến cho bữa ăn của bạn những trải nghiệm
                thú vị và đặc sắc. Chúng tôi không chỉ chia sẻ về những công
                thức nấu ăn ngon mắt mà còn đưa bạn đến những địa điểm ẩm thực
                tuyệt vời, nơi bạn có thể thưởng thức những hương vị tinh tế.
                Bạn cũng có thể để lại những bài viết giới thiệu về ẩm thực trên
                đất nước Việt
              </p>
              {/* <div className="grid grid-cols-2 mb-4 ">
                <div className="pl-3 mt-6">
                  <div className="flex items-center px-3 border-l-4 border-primary ">
                    <h1 className="text-5xl font-bold text-primary ">15</h1>
                    <div className="flex flex-col pl-4">
                      <p className="text-gray-800">Years of</p>
                      <h6 className="font-bold uppercase">EXPERIENCE</h6>
                    </div>
                  </div>
                </div>
                <div className="pl-3 mt-6 ">
                  <div className="flex items-center px-3 border-l-4 border-primary ">
                    <h1 className="text-5xl font-bold text-primary ">50</h1>
                    <div className="flex flex-col pl-4">
                      <p className="text-gray-800">Popularf</p>
                      <h6 className="font-bold uppercase">MASTER CHEFS</h6>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pt-12 pb-4 mx-auto">
        <div className="text-center ">
          <h5 className="relative inline-block pr-8 mb-2 text-3xl font-extrabold text-primary font-dancing">
            <span className="absolute right-full border w-[80px] top-1/2 -translate-x-1/2 h-[1px] border-primary"></span>
            Team 5{" "}
            <span className="absolute left-full border w-[80px] top-1/2 -translate-y-1/2 h-[1px] border-primary"></span>
          </h5>
          <h1 className="mb-12 text-4xl font-bold">Thành viên nhóm Blog</h1>
        </div>
        <div className="grid grid-cols-1 mx-6 md:grid-cols-2 lg:grid-cols-4 gap-x-5">
          {teamMembers.map((item, index) => (
            <div
              key={item.id}
              className="hover:h-full h-[calc(100%-38px)] overflow-hidden bg-white rounded-lg shadow-sm transition-all duration-200 ease-in group"
            >
              <div className="flex flex-col items-center ">
                <div className="w-64 h-64 m-6 overflow-hidden transition-all rounded-full">
                  <img
                    src={item.img}
                    alt=""
                    className="object-cover w-full h-full transition-all rounded-full group-hover:scale-125 "
                  />
                </div>
                <h5 className="text-lg font-bold">{item.name}</h5>
                <small>{item.position}</small>
                <div className="flex justify-center mt-4">
                  <div className="flex items-center justify-center mx-1 text-lg font-bold text-white cursor-pointer bg-primary w-9 h-9 rounded-t-2xl">
                    <FacebookIcon></FacebookIcon>
                  </div>
                  <div className="flex items-center justify-center mx-1 text-lg font-bold text-white cursor-pointer bg-primary w-9 h-9 rounded-t-2xl">
                    <InstagramIcon></InstagramIcon>
                  </div>
                  <div className="flex items-center justify-center mx-1 text-lg font-bold text-white cursor-pointer bg-primary w-9 h-9 rounded-t-2xl">
                    <TwitterIcon></TwitterIcon>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
