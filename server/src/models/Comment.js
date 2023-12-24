import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        content: { type: String, require },
        date: { type: String, require },
        timestamps: { type: Number, require },
        id_customer: { type: String, require },
        id_post: { type: String, require },
        parent_comment_id: { type: String, default: '' },
        status: { type: String, default: "approved" },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Comment", Comment);