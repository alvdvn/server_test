const mongoose = require("mongoose");
const notiSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        title: 'String',
        body: 'String',
        image: 'String',
        typenotificaton: {
            type: String,
            enum: ['all', 'user'],
            default: 'all',
        },
    },
    {timestamps: true}
);
module.exports = mongoose.model("Notification", notiSchema);
