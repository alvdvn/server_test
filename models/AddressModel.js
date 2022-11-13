const mongoose = require("mongoose");
const AddressModel = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true },
        address:[{
            TitleAddress: {type: String},
            DetailAddress:{type:String},
        }],
    },
);
module.exports = mongoose.model("Address", AddressModel);
