const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
    {
        products: [
            {
                productId: {
                    type: String,
                },

            },
        ],
    },
);
module.exports = mongoose.model("Category", CategorySchema);
