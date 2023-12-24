import mongoose from "mongoose";
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-plugin');
const slugify = require('slugify');

const Categories = new Schema(
    {
        title: { type: String, require },
        image: { type: String, default: "", require },
        id_image: { type: String, default: "" },
        date: { type: String, require },
        timestamps: { type: Number, require },
        id_author: { type: String, require },
        status: { type: String, default: "pending" },
    },
    {
        timestamps: true,
    }
);
Categories.plugin(slug, {
    tmpl: '<%=title%>',
    alwaysUpdate: true,
    slugPaddingSize: 4
});
Categories.pre('findOneAndUpdate', async function () {
    const Category = mongoose.model("Categories", Categories);
    if (this._update.title) {
        try {
            const updatedTitle = this._update.title;
            const slug = slugify(updatedTitle, { lower: true });
            let newSlug = slug;
            let count = Math.floor(Math.random() * 999) + 1;
            const existingCategoriesWithSlug = await Category.find({ slug: newSlug });
            if (existingCategoriesWithSlug.length < 1
                || existingCategoriesWithSlug[0]._id.toString() === this._conditions._id.toString()) {
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

module.exports = mongoose.model("Categories", Categories);