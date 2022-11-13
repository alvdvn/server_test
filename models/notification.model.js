const mongoose = require("mongoose");
const notiSchema = new mongoose.Schema(
    {
        title:'String',
        body:'String',
        image:'String',
        time:'String'
    },
);
module.exports = mongoose.model("Notification", notiSchema);
