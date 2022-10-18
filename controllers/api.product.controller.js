const productModel = require('../models/product.model');
exports.getApiProduct = async (req,res,next) =>{
    const  itemList = await productModel.find();
    res.send(itemList)
}