const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        desc: { type: String, required: true },
        img: { type: String, required: true },
        category: [{ type: mongoose.Schema.Types.ObjectId,ref:'Category' , required:true}],
        size: { type: String },
        color: { type: String },
        stock: { type: Number ,required:true },

    },
    { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);
