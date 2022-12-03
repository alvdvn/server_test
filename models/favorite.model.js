const mongoose = require("mongoose");
const FavoriteSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true },
        productId: {
            type: String,
        },
        isFavorite:{type:Boolean,default:false}

    },
    { timestamps: true }
);
module.exports = mongoose.model("Favorite", FavoriteSchema);
