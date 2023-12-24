import Comment from '../models/Comment'
import Post from '../models/Post'
import BaseController from './Controller'

class CommentController extends BaseController {
    constructor(model) {
        super(model)
        this.model = model
    }
    create = async (req, res) => {
        const id_customer = req.customer.id;
        const comment = req.body
        try {
            if (comment) {
                const { id_post } = comment;
                const dataPost = await Post.findById(id_post);
                if (!dataPost) return res.status(400).json({
                    message: "Không tồn tại bài viết này",
                });
                if (dataPost.status !== 'approved') return res.status(400).json({
                    message: "Bài viết này đã bị vô hiệu hóa!",
                });
                const modelComment = {
                    ...comment,
                    id_customer
                };
                const dataComment = await this.model(modelComment).save();
                const { updatedAt, createdAt, ...others } = dataComment._doc;
                if (dataComment) {
                    return res.status(200).json({
                        ...others,
                        message: "Cảm ơn bạn đã bình luận!",
                    });
                } else {
                    return res.status(401).json({
                        message: "Bình luận thất bại!",
                    });
                }
            } else {
                return res.status(401).json({
                    message: "Bạn chưa nhập nội dung nào!",
                });
            }
        } catch (error) {
            console.log('err', error);
            return res.status(500).json({
                message: "Có lỗi xảy ra",
                error: error._message,
            });
        }
    };
    getAllCommentsByPost = async (req, res) => {
        try {
            const id_post = req.query.id
            const dataCommentByPost = await this.model.find({ id_post });
            if (!dataCommentByPost) {
                return res.status(400).json({
                    message: "Không tồn tại bài viết này",
                });
            }
            return res.status(200).json(dataCommentByPost);
        } catch (error) {
            console.log('err', error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    getAllComments = async (req, res) => {
        try {
            const data = await this.model.find();
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
    };
    updateComment = async (req, res) => {
        const id = req.query.id;
        const formData = req.body;
        try {
            const hasComment = await this.model.findOne({ _id: id });
            if (!hasComment) {
                if (fileData) cloudinary.uploader.destroy(fileData.filename);
                return res.status(400).json({
                    message: "Không tồn tại bình luận này",
                });
            }
            const updatedData = {
                ...formData,
            }
            const updatedComment = await this.model.findByIdAndUpdate(id, updatedData, {
                new: true,
            });
            if (!updatedComment) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra, không thể update",
                });
            }
            return res.status(200).json({ message: "Cập nhật thành công" });
        } catch (error) {
            if (fileData) cloudinary.uploader.destroy(fileData.filename);
            console.log('err', error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    deleteComment = async (req, res) => {
        const id_comment = req.query.id;
        try {
            const comment = await this.model.findOne({ _id: id_comment });
            if (!comment) {
                return res.status(400).json({
                    message: "Comment này không tồn tại",
                });
            }
            await this.deleteCommentAndChildren(id_comment);
            return res.status(200).json({ message: "Xóa comment thành công" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    deleteCommentAndChildren = async (commentId) => {
        try {
            const childrenComments = await this.model.find({ parent_comment_id: commentId });
            for (const childComment of childrenComments) {
                await this.deleteCommentAndChildren(childComment._id);
            }
            await this.model.findByIdAndDelete(commentId);
        } catch (error) {
            console.log(error);
            throw new Error("Lỗi trong quá trình xóa comment.");
        }
    }
}

const commentController = new CommentController(Comment)

module.exports = commentController