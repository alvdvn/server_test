const mongoose = require("mongoose");
const notiSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        title: 'String',
        body: 'String',
        image: 'String',
        time: {type: Date},
        typenotificaton: {
            type: String,
            enum: ['all', 'user'],
            default: 'all',
        },
    },
);
module.exports = mongoose.model("Notification", notiSchema);
