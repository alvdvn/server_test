const mongoose = require("mongoose");
const FavoriteSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true },
        productId: {
            type: String,
        },
        title:{type:String},
        ProductIMG:{type:String},
        price:{type:Number},
        sold:{type:Number},
        isFavorite:{type:Boolean,default:false}

    },
    { timestamps: true }
);
module.exports = mongoose.model("Favorite", FavoriteSchema);
