import mongoose from "mongoose";
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-plugin');
const slugify = require('slugify');

const Admin = new Schema(
  {
    user_name: { type: String, require },
    email: { type: String, default: "", require },
    password: { type: String, require },
    image: {
      type: String,
      default: "https://e7.pngegg.com/pngimages/166/90/png-clipart-computer-icons-user-setting-icon-miscellaneous-monochrome.png",
    },
    full_name: { type: String, default: "", require },
    id_image: { type: String, default: "" },
    address: { type: String, default: "" },
    admin: { type: Boolean, default: true },
    role: { type: String, require },
    boss: { type: Boolean, default: false },
    date: { type: String, require },
    timestamps: { type: Number, require },
    status: { type: String, default: 'pending' },
    online: { type: Boolean, default: false },
    timeOnlined: { type: Number },
  },
  {
    timestamps: true,
  }
);
Admin.plugin(slug, {
  tmpl: '<%=full_name%>',
  alwaysUpdate: true,
  slugPaddingSize: 4
});
Admin.pre('findOneAndUpdate', async function () {
  const Admins = mongoose.model("Admin", Admin);
  if (this._update.full_name) {
    try {
      const updatedFullName = this._update.full_name;
      const slug = slugify(updatedFullName, { lower: true });
      let newSlug = slug;
      let count = Math.floor(Math.random() * 999) + 1;
      const existingAdminWithSlug = await Admins.find({ slug: newSlug });
      if (existingAdminWithSlug.length < 1
        || existingAdminWithSlug[0]._id.toString() === this._conditions._id.toString()) {
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

module.exports = mongoose.model("Admin", Admin);
