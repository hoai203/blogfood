import Categories from "../models/Category";
import BaseController from "./Controller";
const cloudinary = require("cloudinary").v2;

class CategoryController extends BaseController {
  constructor(model) {
    super(model);
    this.model = model;
  }
  getAllCategories = async (req, res) => {
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
  getAllCategoriesAdmin = async (req, res) => {
    try {
      const data = await this.model.find();
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
  create = async (req, res) => {
    const id_customer = req.customer.id;
    const isAdmin = req.customer.admin;
    const { title, ...data } = req.body;
    try {
      const modelCategory = {
        ...data,
        title,
        id_customer,
        authorType: isAdmin ? "admin" : "customer",
      };
      const hasCategory = await this.model.findOne({ title });
      if (hasCategory)
        return res.status(401).json({
          message: "Đã tồn tại loại này",
        });
      const dataCategory = await this.model(modelCategory).save();
      if (dataCategory) {
        return res.status(200).json({
          message: "Thêm thành công",
        });
      } else {
        return res.status(401).json({
          message: "Thêm thất bại",
        });
      }
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Có lỗi xảy ra",
        error: error._message,
      });
    }
  };
  createCategory = async (req, res) => {
    const id_admin = req.customer?.id;
    const status = "pending";
    const formData = req.body;
    const { title } = formData;
    const fileData = req.file;
    const image = fileData?.path || "";
    const id_image = fileData?.filename || "";
    try {
      const modelCategory = {
        ...formData,
        image,
        id_image,
        id_admin,
        status,
      };
      const hasCategory = await this.model.findOne({ title });
      if (hasCategory)
        return res.status(401).json({
          message: "Đã tồn tại loại này",
        });
      const dataCategory = await this.model(modelCategory).save();
      if (dataCategory) {
        return res.status(200).json({
          message: "Thêm loại thành công",
        });
      } else {
        return res.status(401).json({
          message: "Thêm thất bại thất bại",
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
  updateCategory = async (req, res) => {
    const id = req.query.id;
    const formData = req.body;
    const fileData = req.file;
    const { title } = formData
    const id_author = req.customer?.id;
    if (!title) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return res.status(400).json({
        message: "Không được để trống",
      });
    }
    try {
      const hasCategory = await this.model.findOne({ _id: id });
      if (!hasCategory) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename);
        return res.status(400).json({
          message: "Không tồn tại loại này",
        });
      }
      const hasTitle = await this.model.findOne({ title });
      const isCategory = id == hasTitle?._id
      if (hasTitle && !isCategory)
        return res.status(401).json({
          message: "Đã tồn tại loại này",
        });
      // const isValid = hasCategory.id_author === id_author;
      // if (!isValid)
      //   return res.status(400).json({
      //     message: "Bạn không có quyền để sửa loại này",
      //   });
      let newImage = hasCategory.image;
      let newIdImage = hasCategory.id_image;

      if (fileData) {
        cloudinary.uploader.destroy(hasCategory.id_image);
        newImage = fileData.path;
        newIdImage = fileData.filename;
      }

      const updatedData = {
        ...formData,
        image: newImage,
        id_image: newIdImage,
        id_author,
      };

      const updatedPost = await this.model.findByIdAndUpdate(id, updatedData, {
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
}

const categoryController = new CategoryController(Categories);

module.exports = categoryController;
