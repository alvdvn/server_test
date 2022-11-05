const mongoose = require("mongoose");
const IMGSchema = new mongoose.Schema(
    {
        IMG:'String',
    },
);
module.exports = mongoose.model("IMG", IMGSchema);
