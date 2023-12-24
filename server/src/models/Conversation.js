import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Conversation = new Schema(
    {
      members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer", // Tham chiếu đến mô hình customer
      },
    ],
      // members: {
      //   type: Array,
      // },
      timestamp: Date
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Conversation", Conversation);