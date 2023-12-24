import mongoose from "mongoose";
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-plugin');
const slugify = require('slugify');

const Customer = new Schema(
    {
        user_name: { type: String, require },
        email: { type: String, require },
        password: { type: String, require },
        image: {
            type: String,
            default: "https://img.freepik.com/free-vector/cute-burger-chef-thumbs-up-cartoon-icon-illustration-food-chef-icon-isolated-flat-cartoon-style_138676-3109.jpg",
        },
        full_name: { type: String, require },
        id_image: { type: String, default: "" },
        id_admin: { type: String, default: "" },
        address: { type: String, default: "" },
        status: { type: String, default: 'approved' },
        online: { type: Boolean, default: false },
        favourites: { type: Array, default: [String] },
        date: { type: String, default: '', require },
        timestamps: { type: Number, require },
        timeOnlined: { type: Number },
    },
    {
        timestamps: true,
    }
);
Customer.plugin(slug, {
    tmpl: '<%=full_name%>',
    alwaysUpdate: true,
    slugPaddingSize: 4
});

Customer.pre('findOneAndUpdate', async function () {
    const Customers = mongoose.model("Customer", Customer);
    if (this._update.full_name) {
        try {
            const updatedFullName = this._update.full_name;
            const slug = slugify(updatedFullName, { lower: true });
            let newSlug = slug;
            let count = Math.floor(Math.random() * 999) + 1;
            const existingCustomerWithSlug = await Customers.find({ slug: newSlug });
            if (existingCustomerWithSlug.length < 1
                || existingCustomerWithSlug[0]._id.toString() === this._conditions._id.toString()) {
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


module.exports = mongoose.model("Customer", Customer);