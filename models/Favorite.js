const mongoose = require("mongoose");
const FavoriteSchema = new mongoose.Schema(
    {
        userId:{type:String,require:true},
        products: [
            {
                productId: {
                    type: String,
                },

            },
        ],
    },
    { timestamps: true }
);
module.exports = mongoose.model("Favorite", FavoriteSchema);
