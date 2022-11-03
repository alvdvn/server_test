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
                ProductIMG:{type:String},
                price:{type:Number},
                size:{type:String},
                color:{type:String},
                quantity: {
                    type: Number,
                    default: 1,
                    min:[1]
                },
            },
        ],
        Total:{
            type:Number
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Cart", CartSchema);
