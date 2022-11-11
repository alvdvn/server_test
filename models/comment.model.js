const mongoose = require("mongoose");
const {types} = require("util");
const CmtSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
                userId: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true },
                userName:{type:String},
                userIMG:{type:String},
                ratingStar:{type:Number},
                commentDes:{type:String},

    },
    { timestamps: true }
);
module.exports = mongoose.model("comment", CmtSchema);
