const cloudinary = require("cloudinary").v2;
import argon2 from "argon2";
import { generateAccessToken, generateRefreshToken } from "../jwt";
import Post from "../models/Post";
import Customer from "../models/Customer";
import Comment from "../models/Comment";
import Categories from "../models/Category";
class BaseController {
  constructor(model) {
    this.model = model;
  }
  // Phương thức register dùng chung
  register = async (req, res) => {
    const { user_name, password, re_password, ...info } = req.body;
    const fileData = req.file;
    const image = fileData?.path;
    const id_image = fileData?.filename;
    const id_admin = req.customer?.id || "";
    const timestamps = Date.now();
    try {
      const existingUser = await this.model.findOne({ user_name });
      if (existingUser) {
        throw new Error("Tài khoản đã tồn tại");
      }
      if (password !== re_password) {
        throw new Error("Mật khẩu không trùng khớp!");
      }
      const hashPass = await argon2.hash(password);
      const userData = {
        ...info,
        image,
        id_image,
        user_name,
        password: hashPass,
        id_admin,
        timestamps,
      };
      const newUser = await this.model(userData).save();
      if (!newUser) {
        throw new Error("Có lỗi xảy ra");
      }
      return res.status(200).json({
        message: "Đăng ký tài khoản thành công",
      });
    } catch (error) {
      if (fileData) cloudinary.uploader.destroy(id_image);
      console.log("error: ", error);
      return res
        .status(
          error.message === "Tài khoản đã tồn tại" ||
            error.message === "Có lỗi xảy ra"
            ? 400
            : 500
        )
        .json({
          message: error.message || "Server is error",
        });
    }
  };

  // Phương thức login dùng chung
  login = async (req, res) => {
    try {
      const { user_name, password } = req.body;
      if (!user_name && !password)
        return res.status(400).json({
          message: "Không được bỏ trống",
        });
      const user = await this.model.findOne({ user_name });
      if (!user) {
        return res.status(402).jsonp({
          message: "Sai tài khoản",
        });
      }
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid) {
        return res.status(402).jsonp({
          message: "Sai mật khẩu",
        });
      }
      if (user.status === "destroy") {
        return res.status(402).jsonp({
          message:
            "Tài khoản của bạn đã bị vô hiệu hóa, vui lòng liên hệ với Quản trị viên để được giúp đỡ!",
        });
      }
      if (user.status === "pending") {
        return res.status(402).jsonp({
          message: "Tài khoản của bạn đang trong trạng thái chờ duyệt!",
        });
      }
      if (user && passwordValid) {
        const isAdmin = user.admin;
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.cookie(
          isAdmin ? "refreshTokenAdmin" : "refreshToken",
          refreshToken,
          {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          }
        );
        const { password, id_image, updatedAt, createdAt, ...others } =
          user._doc;
        await this.model.findByIdAndUpdate(user._id, { online: true });
        return res
          .status(200)
          .json({ ...others, accessToken, message: "Đăng nhập thành công" });
      }
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).json({
        message: "Server is error",
      });
    }
  };
  logout = async (req, res) => {
    const id_customer = req.query?.id;
    const timeOnlined = Date.now();
    await this.model.findByIdAndUpdate(id_customer, {
      online: false,
      timeOnlined,
    });
    res.cookie("refreshToken", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Đăng xuất thành công" });
  };
  // Quên mật khẩu

  getAll = async (req, res) => {
    try {
      const data = await this.model.find({ status: "approved" });
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

  detail = async (req, res) => {
    try {
      const id = req.query.id;
      const data = await this.model.findById(id);
      if (!data)
        return res.status(400).json({
          message: "Không tìm thấy dữ liệu",
        });
      return res.status(200).json(data);
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  };
  createPost = async (req, res) => {
    const id_customer = req.customer.id;
    let id_admin = null;
    let status = "pending";
    let authorType = "customer";
    const isAdmin = req.customer.admin || null;
    const formData = req.body;
    const fileData = req.file;
    const image = fileData?.path || "";
    const id_image = fileData?.filename || "";
    const { category } = formData;
    if (isAdmin) {
      id_admin = req.customer.id;
      authorType = "admin";
    }
    const dataCategory = await Categories.findById(category);
    if (!dataCategory || dataCategory?.status !== 'approved') {
      if (fileData) cloudinary.uploader.destroy(id_image);
      return res.status(400).json({
        message: id_admin ? 'Danh mục chưa được duyệt hoặc đã bị vô hiệu hóa!' : 'Không có danh mục này!',
      });
    }
    try {
      const modelPost = {
        ...formData,
        image,
        id_image,
        id_customer,
        authorType,
        id_admin,
        status,
      };
      const dataPost = await Post(modelPost).save();
      const { _id } = dataPost._doc;
      if (dataPost) {
        return res.status(200).json({
          message: "Tạo bài viết thành công",
          id: _id
        });
      } else {
        if (fileData) cloudinary.uploader.destroy(id_image);
        return res.status(401).json({
          message: "Tạo bài viết thất bại",
        });
      }
    } catch (error) {
      if (fileData) cloudinary.uploader.destroy(id_image);
      console.log("err", error);
      return res.status(500).json({
        message: "Có lỗi xảy ra",
        error: error._message,
      });
    }
  };

  updatePost = async (req, res) => {
    const id = req.query.id;
    const formData = req.body;
    const fileData = req.file;
    const id_customer = req.customer?.id;
    const id_admin = req.customer.id;
    if (!formData) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return res.status(400).json({
        message: "Không có dữ liệu!",
      });
    }
    try {
      const hasPost = await Post.findOne({ _id: id });
      if (!hasPost) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename);
        return res.status(400).json({
          message: "Không tồn tại bài viết này",
        });
      }
      const dataCategory = await Categories.findById(formData.category);
      if (!dataCategory || dataCategory?.status !== 'approved') {
        if (fileData) cloudinary.uploader.destroy(id_image);
        return res.status(400).json({
          message: 'Không có danh mục này!',
        });
      }
      const isValid = hasPost.id_customer === id_customer;
      if (!isValid) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename);
        return res.status(400).json({
          message: "Bạn không có quyền để sửa bài viết này",
        });
      }
      let newImage = hasPost.image;
      let newIdImage = hasPost.id_image;

      if (fileData) {
        cloudinary.uploader.destroy(hasPost.id_image);
        newImage = fileData.path;
        newIdImage = fileData.filename;
      }

      const updatedData = {
        ...formData,
        image: newImage,
        id_image: newIdImage,
        id_admin,
      };

      const updatedPost = await Post.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      if (!updatedPost) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename);
        return res.status(400).json({
          message: "Có lỗi xảy ra, không thể update",
        });
      }
      const { id_image, updatedAt, createdAt, ...others } = updatedPost._doc;
      return res
        .status(200)
        .json({ ...others, message: "Cập nhật thành công" });
    } catch (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      console.log("err", error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  };
  updateCustomer = async (req, res) => {
    const id = req.query.id;
    const formData = req.body;
    const fileData = req.file;
    const id_customer = req.customer?.id;
    const id_admin = req.customer.id;
    try {
      const hasCustomer = await Customer.findOne({ _id: id });
      if (!hasCustomer) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename);
        return res.status(400).json({
          message: "Không tồn tại người dùng này",
        });
      }
      const isValid = hasCustomer._id == id_customer;
      if (!isValid)
        return res.status(400).json({
          message: "Bạn không có quyền để sửa người dùng này",
        });
      let newImage = hasCustomer.image;
      let newIdImage = hasCustomer.id_image;

      if (fileData) {
        cloudinary.uploader.destroy(hasCustomer.id_image);
        newImage = fileData.path;
        newIdImage = fileData.filename;
      }

      const updatedData = {
        ...formData,
        image: newImage,
        id_image: newIdImage,
        id_admin,
      };

      const updatedCustomer = await Customer.findByIdAndUpdate(
        id,
        updatedData,
        {
          new: true,
        }
      );
      if (!updatedCustomer) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename);
        return res.status(400).json({
          message: "Có lỗi xảy ra, không thể update",
        });
      }
      const { id_image, updatedAt, createdAt, ...others } =
        updatedCustomer._doc;
      return res
        .status(200)
        .json({ ...others, message: "Cập nhật thành công" });
    } catch (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      console.log("err", error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  };

  detailBySlug = async (req, res) => {
    try {
      const slug = req.query.slug;
      const data = await this.model.findOne({ slug, status: 'approved' });
      if (!data)
        return res.status(400).json({
          message: "Không có nội dung này",
        });
      return res.status(200).json(data);
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  };
  disable = async (req, res) => {
    const id = req.query.id;
    try {
      const data = await this.model.findOne({ _id: id });
      if (!data) {
        return res.status(400).json({
          message: "Không tồn tại nội dung này",
        });
      }
      const response = await this.model.findByIdAndUpdate(data._id, {
        status: "destroy",
      });
      if (!response) {
        return res.status(400).json({
          message: "Có lỗi xảy ra không thể ẩn Nội dung!",
        });
      }
      return res.status(200).json({
        message: "Đã ẩn thành công!",
      });
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  };
  deletePost = async (req, res) => {
    const id_post = req.query.id;
    const id_customer = req.customer.id;
    try {
      const post = await Post.findOne({ _id: id_post });
      if (!post) {
        return res.status(400).json({
          message: "Bài viết này không tồn tại",
        });
      }
      if (id_customer !== post.id_customer)
        return res.status(400).json({
          message: "Bạn không có quyền xóa bài viết này",
        });
      await Comment.deleteMany({ id_post });
      await Post.findByIdAndDelete(id_post);
      if (post.id_image) {
        cloudinary.uploader.destroy(post.id_image);
      }

      return res.status(200).json({ message: "Xóa bài viết thành công" });
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  };

}

// const adminController = new BaseController(Admin);
// const customerController = new BaseController(Customer);

module.exports = BaseController;
