import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FeedBack = new Schema(
  {
    fullName: { type: String, require },
    message: { type: String, require },
    phone: { type: String },
    email: { type: String, require },
    date: { type: String, require },
    timestamps: { type: Number, require },
    status: { type: String, default: "pending" },

  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("FeedBack", FeedBack);
