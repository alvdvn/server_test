const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },
                title:{type:String},
                price:{type:Number},
                img:{type:String},
                quantity: {
                    type: Number,
                    default: 1,
                },
                Amount:{
                    type:Number
                }
            },
        ],
    },
    { timestamps: true }
);
module.exports = mongoose.model("Cart", CartSchema);
