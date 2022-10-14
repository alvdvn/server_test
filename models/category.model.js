const mongoose = require("mongoose");
const {text} = require("body-parser");
const CategorySchema = new mongoose.Schema(
    {
               title:{type:String ,required:true},
               CateImg:{type:String,required: true}

    },
);
module.exports = mongoose.model("Category", CategorySchema);
