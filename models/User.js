const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
            full_name:{type:String,required:true},
        address:{type:String},
        phoneNumber: { type: Number, require: true },

    },
    { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
