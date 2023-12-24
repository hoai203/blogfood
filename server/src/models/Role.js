import mongoose from "mongoose";
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-plugin');


const Role = new Schema(
    {
        title: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Role", Role);