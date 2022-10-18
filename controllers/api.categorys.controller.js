const categoryModel = require('../models/category.model');
exports.getApiCategory = async (req,res,next) =>{
    const  itemList = await categoryModel.find();
    res.send(itemList)
}