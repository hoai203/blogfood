import nodemailer from "nodemailer";
import FeedBack from "../models/SendEmail";
import Customer from "../models/Customer";
import Admin from "../models/Admin";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
const util = require("util");
const jwtVerifyAsync = util.promisify(jwt.verify);
class SendEmailController {
  constructor() {}
  send = async (req, res) => {
    const { fullName, email, phone, message } = req.body;
    try {
      sendEmail({ fullName, email, phone, message });
      res.json({ message: "Phản hồi thành công" });
    } catch (err) {
      res.status(500).json({ message: "phản hồi thất bại" });
    }
  };
  createFeedBack = async (req, res) => {
    const dataFeedBack = req.body;
    try {
      const data = await FeedBack(dataFeedBack).save();
      if (data) {
        return res.status(200).json({
          message: "Tạo phản hồi thành công",
        });
      } else {
        return res.status(401).json({
          message: "Tạo phản hồi thất bại",
        });
      }
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Có lỗi xảy ra",
        error: error.message,
      });
    }
  };
  getAllFeedBack = async (req, res) => {
    const id = req.query.id;
    try {
      const data = await FeedBack.find({ id: id });
      if (!data) {
        return res.status(400).json({
          message: "Có lỗi xảy ra",
        });
      }
      return res.status(200).json(data);
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  };
  forgotPassword = async (req, res) => {
    try {
      const { user_name } = req.body;
      const user = await Customer.findOne({ user_name });
      if (!user) {
        res.status(401).json({ message: "Không tìm thấy người dùng" });
      }
      const email = user.email;
      const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_KEY, {
        expiresIn: "5m",
      });
      const link = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
      forgotPass({ email, link });
      return res
        .status(200)
        .json({
          message:
            "Gửi yêu cầu lấy mật khẩu thành công. Vui lòng kiểm tra email!",
        });
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Có lỗi xảy ra",
      });
    }
  };
  checkToken = async (req, res) => {
    const token = req.query.token;
    try {
      const decoded = await jwtVerifyAsync(token, process.env.JWT_ACCESS_KEY);
      if (decoded) {
        return res.status(200).json();
      } else {
        return res.status(401).json({ message: "Hết thời gian đổi mật khẩu!" });
      }
    } catch (error) {
      console.log("err", error);
      if (error && error.name === "TokenExpiredError")
        return res.status(401).json({
          message: "Liên kết đã hết hạn!",
        });
      return res.status(500).json({
        message: "Có lỗi xảy ra",
      });
    }
  };
  forgotPasswordAdmin = async (req, res) => {
    try {
      const { user_name } = req.body;
      const user = await Admin.findOne({ user_name });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Không tìm thấy quản trị viên này!" });
      }
      const email = user.email;
      const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_KEY, {
        expiresIn: "5m",
      });
      const link = `${process.env.CLIENT_URL}/admin/reset-password?token=${token}`;
      forgotPass({ email, link });
      return res
        .status(200)
        .json({
          message:
            "Gửi yêu cầu lấy mật khẩu thành công. Vui lòng kiểm tra email!",
        });
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Có lỗi xảy ra",
      });
    }
  };

  resetPassword = async (req, res) => {
    const token = req.query.token;
    const { newPassword } = req.body;

    try {
      let id = "";
      const decoded = await jwtVerifyAsync(token, process.env.JWT_ACCESS_KEY);
      if (decoded) {
        id = decoded.id;
      } else {
        return res.status(401).json({ message: "Hết thời gian đổi mật khẩu!" });
      }
      const user = await Customer.findOne({ _id: id });
      if (!user) {
        return res.status(401).json({ message: "Không tìm thấy người dùng" });
      }

      const passwordValid = await argon2.verify(user?.password, newPassword);

      if (passwordValid) {
        return res.status(402).jsonp({
          message: "Mật khẩu đã tồn tại",
        });
      }

      const hashedPassword = await argon2.hash(newPassword);
      const updated = await Customer.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        {
          new: true,
        }
      );
      if (!updated) {
        return res.status(401).json({ message: "Không thể cập nhập!" });
      }

      return res.json({ message: "Cập nhập mật khẩu thành công" });
    } catch (error) {
      console.log("err", error);
      if (error && error.name === "TokenExpiredError")
        return res.status(401).json({
          message: "Liên kết đã hết hạn!",
        });
      return res.status(500).json({
        message: "Có lỗi xảy ra",
      });
    }
  };
  resetPasswordAdmin = async (req, res) => {
    const token = req.query.token;
    const { newPassword } = req.body;

    try {
      let id = "";
      const decoded = await jwtVerifyAsync(token, process.env.JWT_ACCESS_KEY);
      if (decoded) {
        id = decoded.id;
      } else {
        return res.status(401).json({ message: "Hết thời gian đổi mật khẩu!" });
      }
      const user = await Admin.findOne({ _id: id });
      if (!user) {
        return res.status(401).json({ message: "Không tìm thấy người dùng" });
      }

      const passwordValid = await argon2.verify(user?.password, newPassword);

      if (passwordValid) {
        return res.status(402).jsonp({
          message: "Mật khẩu đã tồn tại",
        });
      }

      const hashedPassword = await argon2.hash(newPassword);
      const updated = await Admin.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        {
          new: true,
        }
      );
      if (!updated) {
        return res.status(401).json({ message: "Không thể cập nhập!" });
      }

      return res.json({ message: "Cập nhập mật khẩu thành công" });
    } catch (error) {
      console.log("err", error);
      if (error && error.name === "TokenExpiredError")
        return res.status(401).json({
          message: "Liên kết đã hết hạn!",
        });
      return res.status(500).json({
        message: "Có lỗi xảy ra",
      });
    }
  };
}

const sendEmailController = new SendEmailController(sendEmail, forgotPass);
module.exports = sendEmailController;

const mail = (options) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("email send:" + info.response);
    }
  });
};

const sendEmail = ({ fullName, email, phone, message }) => {
  const options = {
    from: process.env.USER,
    to: email,
    subject: "Message from BlogFoodViet",
    html: `
    <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
    <div style="max-width: 700px; background-color: white; margin: 0 auto">
      <div style="width: 100%;">
      <a href="${process.env.CLIENT_URL}" ><img
          src="https://i.ex-cdn.com/vntravellive.com/files/news/2022/07/20/am-thuc-viet-nam-thuoc-top-ngon-nhat-the-gioi-104749.jpg"
          style="width: 100%; height: 350px; object-fit: cover"
        /></a>

      </div>
      <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
        <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
          To Blog FoodsViet
        </p>
        <h1 style="text-align: center; " > Phản hồi </h1>
        <div style="font-size: .8rem; margin: 80px 30px">
          <p>Tên: <b style="color:#FFA500;">${fullName}</b></p>
          <p>Email: <b style="color:#FFA500;">${email}</b></p>
          <p>Số điện thoại: <b style="color:#FFA500;">${phone}</b></p>
          <p>Nội dung: <b style="color:#FFA500;">${message}</b></p>
        </div>
        <p style="text-align: center;">Phản hồi thành công! ❤</p>
      </div>
    </div>
  </div>`,
  };
  mail(options);
};

const forgotPass = ({ link, email }) => {
  const options = {
    from: process.env.USER,
    to: email,
    subject: "Reset password from BlogFoodViet",
    html: `
    <div style="width: 100%;background-color: #f3f9ff; padding: 5rem 0">
    <div style="max-width: 700px; background-color: white; margin: 0 auto">
      <div style="width: 100%; ">
      <a href="${process.env.CLIENT_URL}" ><img
          src="https://i.ex-cdn.com/vntravellive.com/files/news/2022/07/20/am-thuc-viet-nam-thuoc-top-ngon-nhat-the-gioi-104749.jpg"
          style="width: 100%; height: 350px; object-fit: cover"
        /></a>

      </div>
      <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
        <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px; text-align: center;">
          To Blog FoodsViet
        </p>
        <div style="font-size: .8rem; margin: 0 30px">
        <h1 style="text-align: center; " > Đặt lại mật khẩu </h1>
        <p>
        để cập nhập mật khẩu  <a href="${link}" style="color: #FFA500; font-weight: medium;">nhấn vào đây</a>
    </p> 
    <p style="margin-bottom: 60px; ">
    bạn có 5 phút kể từ lúc nhập được mail này
    </p>
    <p style="text-align: center;">Chúc bạn thành công! ❤</p>
        </div>
      </div>
    </div>
  </div>`,
  };
  mail(options);
};
