import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Notification = new Schema(
    {
        id_customer: { type: String, default: '' },
        id_sender: { type: String, default: '' },
        typeNotify: { type: String, default: '' },
        id_post: { type: String, default: '' },
        id_comment: { type: String, default: '' },
        status: { type: Boolean, default: true },
        timestamps: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Notification", Notification);