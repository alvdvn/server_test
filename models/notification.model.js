const mongoose = require("mongoose");
const notiSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId,ref:"User" },
        title:'String',
        body:'String',
        image:'String',
        time:'String'
    },
);
module.exports = mongoose.model("Notification", notiSchema);
