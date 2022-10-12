const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        full_name: { type: String, required: true },
        address: { type: String},
        phone_number: { type: Number,required:true },
    },
    { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);