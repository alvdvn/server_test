const mongoose = require("mongoose");
const {types} = require("util");
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
                quantity: {
                    type: Number,
                    default: 1,
                    min:[1]
                },
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
        status: {
            type: String,
            enum:['Đang chờ xác nhận','Đang chuẩn bị hàng','Đang giao hàng','Giao hàng thành công','người dùng đã hủy đơn hàng'],
            default: "Đang chờ xác nhận"
        },

    },{timestamps:true}

);
module.exports = mongoose.model("Order", OrderSchema);
