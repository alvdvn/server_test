const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true },
        name:'String',
        phoneNumber:'String',
        products: [
            {
                productId: {
                    type: String,
                },
                title:{type:String},
                ProductIMG:{type:String},
                price:{type:Number},
                size:{type:String},
                color:{type:String},
            },
        ],
        address: {
            type: String,
            required: true,
        },
        Total: {
            type: Number,
            require: true,
        },
        paymentMethodType: {
            type: String,
            enum: ['card', 'cash'],
            default: 'cash',
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        status: { type: String,enum:['pending','Confirmed'], default: "pending" },
        paidAt: Date,
        ConfirmedAt:Date
    },
    { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
