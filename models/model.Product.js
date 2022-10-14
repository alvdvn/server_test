const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        desc: { type: String, required: true },

        category: [{ type: mongoose.Schema.Types.ObjectId,ref:'Category' , required:true}],
        sizes: { type: String },
        color: { type: String },
        stock: { type: Number ,required:true },
        img: { type: String, required: true },

    },
    { timestamps: true }
);
// module.exports = mongoose.model("Product", ProductSchema);

const Product = mongoose.model("Product",ProductSchema);
module.exports = Product;