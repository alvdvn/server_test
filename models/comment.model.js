const mongoose = require("mongoose");
const CmtSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        comments:[
            {
                userId: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true },
                ratingStar:{type:Number},
                commentDes:{type:String},
                CmtImg:[{type:String}],
                likes:{type:Number,default:0}
            }
        ]
    },
    { timestamps: true }
);
module.exports = mongoose.model("comment", CmtSchema);
