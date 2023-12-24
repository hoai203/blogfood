import Post from '../models/Post'
const cloudinary = require("cloudinary").v2;
import BaseController from './Controller'
class PostController extends BaseController {
    constructor(model) {
        super(model)
    }
    like = async (req, res) => {
        const id = req.customer.id;
        const id_post = req.query.id;
        try {
            const dataPostDetail = await this.model.findById(id_post);
            if (!dataPostDetail) return res.status(400).json({
                message: "Bài viết này không tồn tại",
            });
            if (dataPostDetail.status !== 'approved') return res.status(400).json({
                message: "Bài viết này đã bị vô hiệu hóa",
            });
            const isLiked = dataPostDetail.likes?.includes(id);

            if (isLiked) {
                // User has already liked the post, so unlike it
                const statusUnlike = await this.model.updateOne(
                    { _id: id_post },
                    { $pull: { likes: id } }
                );

                if (statusUnlike) {
                    return res.status(200).json({
                        message: 'Bạn đã hủy thích bài viết',
                    });
                } else {
                    return res.status(400).json({
                        message: 'Có lỗi xảy ra khi hủy thích'
                    });
                }
            } else {
                // User hasn't liked the post, so like it
                const statusLike = await this.model.updateOne(
                    { _id: id_post },
                    { $addToSet: { likes: id } }
                );

                if (statusLike) {
                    return res.status(200).json({
                        message: 'Cảm ơn bạn đã thích bài viết!',
                    });
                } else {
                    return res.status(400).json({
                        message: 'Có lỗi xảy ra khi thích'
                    });
                }
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Có lỗi xảy ra'
            });
        }
    };
    getAllPostByCustomer = async (req, res) => {
        const id = req.query.id;
        try {
            const dataPost = await this.model.find({ id_customer: id, });
            if (!dataPost) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json(dataPost);
        } catch (error) {
            console.log('err', error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    getAllPostByCategory = async (req, res) => {
        const id = req.query.id;
        try {
            const dataPost = await this.model.find({ category: id, status: 'approved' });
            if (!dataPost) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json(dataPost);
        } catch (error) {
            console.log('err', error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    updateView = async (req, res) => {
        const slug = req.query.slug;
        try {
            const dataPost = await this.model.findOne({ slug });
            if (!dataPost) {
                return res.status(400).json({
                    message: "Không tồn tại sản phẩm này",
                });
            }
            if (dataPost.status !== 'approved') return res.status(400).json({
                message: "Bài viết này đã bị vô hiệu hóa",
            });
            const dataPostView = await this.model.findByIdAndUpdate(dataPost._id, { views: dataPost.views + 1 });
            if (!dataPostView) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json({
                message: "update thanh cong"
            });
        } catch (error) {
            console.log('err', error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    search = async (req, res) => {
        try {
            const value = req.query.key;
            const keyRegex = new RegExp(value, 'i')
            const query = {
                $and: [
                    {
                        $or: [
                            { title: { $regex: keyRegex } },
                            { slug: { $regex: keyRegex } },
                        ],
                    },
                    { status: 'approved' }
                ],
            };
            const dataPost = await this.model.find(query);
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
    uploadImage = async (req, res) => {
        const fileData = req.file;
        try {
            if (!fileData) {
                return res.status(400).json({
                    message: "Không có ảnh tải lên!",
                });
            }
            return res.status(200).json({ url: fileData.path });
        } catch (error) {
            if (fileData) cloudinary.uploader.destroy(fileData.filename);
            console.log('err', error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
}
const postController = new PostController(Post)
module.exports = postController