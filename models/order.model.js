const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true },
        name:'String',
        phoneNumber:'String',

        purDate:'String',
        soLuong:{
            type: Number
        },
        products: [
            {
                productId: {
                    type: String,
                },
                    quantity: {
                    type: Number,
                    default: 1,
                },
                price:{type:Number, required:true},
            },
        ],
        address: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            require: true,
        },
        status: { type: String, default: "pending" },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
