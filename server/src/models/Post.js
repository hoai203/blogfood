import mongoose from "mongoose";
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-plugin');
const slugify = require('slugify');
const Post = new Schema(
    {
        title: { type: String, require },
        content: { type: String, require },
        category: { type: String, require },
        views: { type: Number, default: 0 },
        image: { type: String, default: "", require },
        date: { type: String, require },
        timestamps: { type: Number, require },
        id_customer: { type: String, require },
        id_image: { type: String, default: "" },
        id_admin: { type: String, default: "" },
        status: { type: String, default: "pending" },
        likes: { type: Array, default: [String] },
        authorType: { type: String, default: "customer" },
    },
    {
        timestamps: true,
    }
);
Post.plugin(slug, {
    tmpl: '<%=title%>',
    alwaysUpdate: true,
    slugPaddingSize: 4
});
Post.pre('findOneAndUpdate', async function () {
    const Posts = mongoose.model("Post", Post);
    if (this._update.title) {
        try {
            const updatedTitle = this._update.title;
            const slug = slugify(updatedTitle, { lower: true });
            let newSlug = slug;
            let count = Math.floor(Math.random() * 999) + 1;
            const existingPostWithSlug = await Posts.find({ slug: newSlug });
            if (existingPostWithSlug.length < 1
                || existingPostWithSlug[0]._id.toString() === this._conditions._id.toString()) {
                this.set({ slug: newSlug });
                return;
            }
            newSlug = `${slug}-${count}`;
            this.set({ slug: newSlug });
        } catch (error) {
            console.error(error);
        }
    }
});
module.exports = mongoose.model("Post", Post);