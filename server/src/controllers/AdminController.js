import Admin from "../models/Admin";
import Customer from "../models/Customer";
import Post from "../models/Post";
import Comment from "../models/Comment";
import Categories from "../models/Category";
import Role from "../models/Role";
import BaseController from "./Controller";
import FeedBack from "../models/SendEmail";

const cloudinary = require("cloudinary").v2;

class AdminController extends BaseController {
  constructor(
    model,
    customerModel,
    postModel,
    commentModel,
    categoryModel,
    feedbackModel,
    roleModel) {

    super(model);
    this.commentModel = commentModel;
    this.customerModel = customerModel;
    this.postModel = postModel;
    this.categoryModel = categoryModel;
    this.feedbackModel = feedbackModel;
    this.roleModel = roleModel;
  }


  deleteRelatedData = async (id, userType) => {
    const posts = await this.postModel.find({ id_customer: id });
    let deleteTasks = posts.map((post) => {
      if (post.id_image) {
        cloudinary.uploader.destroy(post.id_image);
      }
      return this.commentModel.deleteMany({ id_post: post._id });
    });
    await Promise.all(deleteTasks);
    await this.commentModel.deleteMany({ id_customer: id });
    await this.postModel.deleteMany({ id_customer: id });

    if (userType === "Admin") {
      const oldAdmin = await this.model.findOne({ _id: id });
      cloudinary.uploader.destroy(oldAdmin.id_image);
    } else if (userType === "Customer") {
      const oldCustomer = await this.customerModel.findOne({ _id: id });
      cloudinary.uploader.destroy(oldCustomer.id_image);
    }
  };
  deleteCustomer = async (req, res) => {
    const id = req.query.id;
    try {
      const oldCustomer = await this.customerModel.findOne({ _id: id });
      if (!oldCustomer) {
        return res.status(400).json({
          message: "Không tồn tại khách hàng này",
        });
      }
      await this.deleteRelatedData(id, "Customer");
      const dataCustomer = await this.customerModel.findByIdAndDelete(id);
      if (!dataCustomer)
        return res.status(400).json({
          message: "Có lỗi xảy ra",
        });
      return res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  };
  deleteAdmin = async (req, res) => {
    const id = req.query.id;
    try {
      const oldAdmin = await this.model.findOne({ _id: id });
      if (!oldAdmin) {
        return res.status(400).json({
          message: "Không tồn tại admin này",
        });
      }
      await this.deleteRelatedData(id, "Admin");
      const dataAdmin = await this.model.findByIdAndDelete(id);
      if (!dataAdmin)
        return res.status(400).json({
          message: "Có lỗi xảy ra",
        });
      return res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  };
  deletePost = async (req, res) => {
    const id_post = req.query.id;
    try {
      const post = await this.postModel.findOne({ _id: id_post });
      if (!post) {
        return res.status(400).json({
          message: "Bài viết này không tồn tại",
        });
      }
      // Xóa tất cả các comment liên quan
      await this.commentModel.deleteMany({ id_post });
      // Xóa bài viết
      await this.postModel.findByIdAndDelete(id_post);
      // Xóa hình ảnh nếu có
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
  deleteCategory = async (req, res) => {
    const id_category = req.query.id;
    try {
      const category = await this.categoryModel.findOne({ _id: id_category });
      if (!category) {
        return res.status(400).json({
          message: "Category này không tồn tại",
        });
      }
      // Tìm tất cả các bài viết trong category này
      const posts = await this.postModel.find({ id_category });
      // Xóa tất cả comment liên quan và bài viết
      let deleteTasks = posts.map(async (post) => {
        // Xóa comments và post
        await Promise.all([
          this.commentModel.deleteMany({ id_post: post._id }),
          this.postModel.findByIdAndDelete(post._id),
        ]);
        // Xóa hình ảnh nếu có
        if (post.id_image) {
          await cloudinary.uploader.destroy(post.id_image);
        }
      });
      await Promise.all(deleteTasks);
      // Xóa category
      await this.categoryModel.findByIdAndDelete(id_category);

      return res.status(200).json({ message: "Xóa category thành công" });
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  };
  deleteComment = async (req, res) => {
    const id_comment = req.query.id;
    try {
      const comment = await this.commentModel.findOne({ _id: id_comment });
      if (!comment) {
        return res.status(400).json({
          message: "Comment này không tồn tại",
        });
      }
      // Xóa comment
      await this.commentModel.findByIdAndDelete(id_comment);

      return res.status(200).json({ message: "Xóa comment thành công" });
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  };
  updatePostByCategory = async (req, res) => {
    const id_category = req.query.id;
    try {
      const category = await this.categoryModel.findOne({ _id: id_category });
      if (!category) {
        return res.status(400).json({
          message: "Category này không tồn tại",
        });
      }
      // Tìm tất cả các bài viết trong category này
      const posts = await this.postModel.find({ id_category });
      // Xóa tất cả comment liên quan và bài viết
      let deleteTasks = posts.map(async (post) => {
        // Xóa comments và post
        await Promise.all([
          this.commentModel.deleteMany({ id_post: post._id }),
          this.postModel.findByIdAndDelete(post._id),
        ]);
        // Xóa hình ảnh nếu có
        if (post.id_image) {
          await cloudinary.uploader.destroy(post.id_image);
        }
      });
      await Promise.all(deleteTasks);
      // Xóa category
      await this.categoryModel.findByIdAndDelete(id_category);

      return res.status(200).json({ message: "Xóa category thành công" });
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  };
  updateStatus = async (req, res) => {
    const customer = req.customer
    const id = req.query?.id;
    const admin = customer?.admin;
    const id_admin = customer?.id;
    const { status } = req.body;
    const modelType = req.query.model;
    let model;
    switch (modelType) {
      case "post":
        model = this.postModel;
        break;
      case "admin":
        model = this.model;
        break;
      case "comment":
        model = this.commentModel;
        break;
      case "category":
        model = this.categoryModel;
        break;
      case "customer":
        model = this.customerModel;
        break;
      case "feedback":
        model = this.feedbackModel;
        break;
      default:
        return res.status(400).json({ message: "Model không hợp lệ" });
    }
    try {
      const dataModel = await model.findOne({ _id: id });
      if (!dataModel) {
        return res.status(400).json({
          message: "Không tồn tại nội dung này",
        });
      }
      if (!admin) {
        return res.status(400).json({
          message: "Bạn không phải là Admin",
        });
      }
      if (modelType === 'admin') {
        const data = { ...dataModel._doc }
        const dataAdmin = await model.findOne({ _id: id_admin });
        const dataRole = await Role.findOne({ _id: data.role })
        const dataRoleAdmin = await Role.findOne({ _id: dataAdmin.role })
        if (dataRoleAdmin?.title !== "Admin") return res.status(400).json({
          message: "Bạn không có quyền hạn để chỉnh sửa người này",
        });
        if (data?.boss) return res.status(400).json({
          message: "Bạn không có quyền hạn để chỉnh sửa người này",
        });
        if (dataRole?.title === 'Admin' && !dataAdmin.boss) {
          return res.status(400).json({
            message: "Bạn không có quyền hạn để chỉnh sửa người này",
          });
        }
      }
      if (modelType === 'category') {
        if (status === 'destroy') {
          await this.postModel.updateMany({ category: id, status: 'approved' }, { $set: { status: 'pending' } })
        }
        if (status === 'approved') {
          await this.postModel.updateMany({ category: id, status: 'pending' }, { $set: { status } })
        }
      }
      if (modelType === 'customer') {
        if (status === 'destroy') {
          await this.postModel.updateMany({ id_customer: id, status: 'approved' },
            { $set: { status: 'pending' } })
        }
        if (status === 'approved') {
          await this.postModel.updateMany({ id_customer: id, status: 'pending' },
            { $set: { status } })
        }
      }
      if (modelType === 'post' && status === 'approved') {
        const dataPost = await model.findOne({ _id: id });
        if (dataPost) {
          const dataCategory = await this.categoryModel.findOne({ _id: dataPost?.category });
          const dataCustomer = await this.customerModel.findOne({ _id: dataPost?.id_customer });
          const dataAdmin = await this.model.findOne({ _id: dataPost?.id_customer });
          if (!dataCategory) return res.status(400).json({
            message: "Danh mục không tồn tại!",
          });
          if (dataCategory?.status !== 'approved') {
            return res.status(400).json({
              message: `Danh mục ${dataCategory?.title} không khả dụng!`,
            });
          }
          if (!(dataCustomer || dataAdmin)) return res.status(400).json({
            message: "Người dùng không tồn tại!",
          });
          if (dataCustomer && dataCustomer?.status !== 'approved') {
            return res.status(400).json({
              message: `Người dùng ${dataCustomer?.full_name} không khả dụng!`,
            });
          } else if (dataAdmin && dataAdmin?.status !== 'approved') {
            return res.status(400).json({
              message: `Người dùng ${dataAdmin?.full_name} không khả dụng!`,
            });
          }
        } else {
          return res.status(400).json({
            message: "Bài viết không tồn tại",
          });
        }
      }
      const dataModelStatus = await model.findByIdAndUpdate(
        dataModel._id,
        { status, id_admin },
        {
          new: true,
        }
      );
      const dataModal = dataModelStatus?._doc
      if (!dataModelStatus) {
        return res.status(400).json({
          message: "Có lỗi xảy ra",
        });
      }
      return res.status(200).json({
        ...dataModal,
        message: `Cập nhật thành công`,
      });
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  };
  searchAdmin = async (req, res) => {
    const modelType = req.query.model;
    let model;
    switch (modelType) {
      case "post":
        model = this.postModel;
        break;
      case "admin":
        model = this.model;
        break;
      case "category":
        model = this.categoryModel;
        break;
      case "customer":
        model = this.customerModel;
        break;
      default:
        return res.status(400).json({ message: "Model không hợp lệ" });
    }
    try {
      const value = req.query.key;
      const keyRegex = new RegExp(value, 'i')
      const query = {
        $and: [
          {
            $or: [
              { title: { $regex: keyRegex } },
              { slug: { $regex: keyRegex } },
              { full_name: { $regex: keyRegex } },
              { user_name: { $regex: keyRegex } },
              { email: { $regex: keyRegex } },
            ],
          },
        ],
      };
      const dataPost = await model.find(query);
      if (!dataPost)
        return res.status(400).json({
          message: "Có lỗi xảy ra",
        });
      return res.status(200).json(dataPost);
    } catch (error) {
      console.log('err', error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  };
  updateRoleAdmin = async (req, res) => {
    const customer = req.customer
    const id = req.query?.id;
    const admin = customer?.admin;
    const id_admin = customer?.id;
    const { role } = req.body;
    try {
      const dataAdmin = await this.model.findOne({ _id: id });
      const dataBoss = await this.model.findOne({ _id: id_admin });
      if (!dataAdmin) {
        return res.status(400).json({
          message: "Không tồn tại người này",
        });
      }
      if (!admin) {
        return res.status(400).json({
          message: "Bạn không phải là Admin",
        });
      }
      if (!dataBoss.boss) {
        return res.status(400).json({
          message: "Bạn không có quyền hạn để chỉnh sửa người này",
        });
      }
      if (dataAdmin._id == id_admin) {
        return res.status(400).json({
          message: "Bạn không thể chỉnh sửa chính bạn",
        });
      }
      const response = await this.model.findByIdAndUpdate(
        id,
        { role },
        {
          new: true,
        }
      );
      if (!response) {
        return res.status(400).json({
          message: "Có lỗi xảy ra",
        });
      }
      return res.status(200).json({
        message: `Cập nhật thành công`,
      });
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  };
  getAllPostByAdmin = async (req, res) => {
    try {
      const data = await this.postModel.find();
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
  statistical = async (req, res) => {
    async function countModelByTimePeriod(period, type) {
      try {
        const aggregationPipeline = [];
        let dateGroupingFormat = '';

        switch (period) {
          case 'day':
            dateGroupingFormat = '%Y-%m-%d';
            break;
          case 'week':
            dateGroupingFormat = '%Y-%U';
            break;
          case 'month':
            dateGroupingFormat = '%Y-%m';
            break;
          default:
            throw new Error('Định dạng không hợp lệ!');
        }
        let model = ''
        switch (type) {
          case 'customer':
            model = Customer;
            break;
          case 'category':
            model = Categories;
            break;
          case 'post':
            model = Post;
            break;
          case 'feedback':
            model = FeedBack;
            break;
          default:
            throw new Error('Model không hợp lệ!');
        }
        aggregationPipeline.push({
          $group: {
            _id: { $dateToString: { format: dateGroupingFormat, date: { $toDate: '$timestamps' } } },
            count: { $sum: 1 }
          }
        });
        aggregationPipeline.push({ $sort: { '_id': 1 } });
        const result = await model.aggregate(aggregationPipeline);

        if (period === 'month') {
          const allMonths = Array.from({ length: 12 }, (_, index) => {
            const month = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
            return `2023-${month}`;
          });

          // Lọc các tháng không có trong kết quả aggregation
          const existingMonths = result.map((item) => item._id);
          const missingMonths = allMonths.filter((month) => !existingMonths.includes(month));

          const missingMonthsData = missingMonths.map((month) => ({
            _id: month,
            count: 0
          }));

          const finalResult = [...result, ...missingMonthsData];

          finalResult.sort((a, b) => (a._id > b._id ? 1 : -1));
          return finalResult;
        }
        return result;
      } catch (error) {
        return res.status(500).json({ message: "Có lỗi xảy ra!" });
      }
    }
    const model = req.query.model
    try {
      const statisticalByDay = await countModelByTimePeriod('day', model);
      const statisticalByWeek = await countModelByTimePeriod('week', model);
      const statisticalByMonth = await countModelByTimePeriod('month', model);
      return res.status(200).json({ statisticalByDay, statisticalByWeek, statisticalByMonth });
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ message: "Lỗi Server" });
    }
  };

  getAllCategoryByAdmin = async (req, res) => {
    try {
      const data = await this.categoryModel.find({});
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


  getListAdmin = async (req, res) => {
    try {
      const data = await this.model.find({});
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

  updateAdmin = async (req, res) => {
    const id = req.query.id;
    const formData = req.body;
    const fileData = req.file;

    try {
      const hasAdmin = await this.model.findOne({ _id: id });
      if (!hasAdmin) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename);
        return res.status(400).json({
          message: "Không tồn tại người dùng này",
        });
      }

      let newImage = hasAdmin.image;
      let newIdImage = hasAdmin.id_image;
      if (fileData) {
        cloudinary.uploader.destroy(hasAdmin.id_image);
        newImage = fileData.path;
        newIdImage = fileData.filename;
      }

      const updatedData = {
        ...formData,
        image: newImage,
        id_image: newIdImage,
      };

      const updatedAdmin = await this.model.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      if (!updatedAdmin) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename);
        return res.status(400).json({
          message: "Có lỗi xảy ra, không thể update",
        });
      }

      const { password, id_image, updatedAt, createdAt, ...others } =
        updatedAdmin._doc;

      return res.status(200).json({ others, message: "Cập nhật thành công" });
    } catch (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      console.log("err", error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  };
  getRole = async (req, res) => {
    try {
      const data = await this.roleModel.find();
      if (!data) {
        return res.status(400).json({
          message: "Có lỗi xảy ra",
        });
      }
      return res.status(200).json(data);
    } catch (error) {
      console.log('err', error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  }
  logout = async (req, res) => {
    const id_customer = req.query?.id;
    const timeOnlined = Date.now();
    await this.model.findByIdAndUpdate(id_customer, {
      online: false,
      timeOnlined,
    });
    res.cookie("refreshTokenAdmin", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Đăng xuất thành công" });
  };
}


const adminController = new AdminController(
  Admin,
  Customer,
  Post,
  Comment,
  Categories,
  FeedBack,
  Role,
);

module.exports = adminController;
