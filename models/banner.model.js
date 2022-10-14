const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema(
    {
        description:'String',
        anh:'String',
    },
);
module.exports = mongoose.model("Banner", bannerSchema);
