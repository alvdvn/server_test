const productModel = require('../models/product.model');
const {model} = require("mongoose");
const ProductModel = require("../models/product.model");
exports.getApiProduct= async (req,res,next) =>{
    const  itemList = await productModel.find();
    res.send(itemList)
}
exports.GetOne = async (req,res,next)=>{
    let item = await  productModel.findById(req.params.id)
        .exec().catch(err=>{
            console.log(err)
        });
    if (item == null){
        console.log("khong tim thay id");
    }
    console.log(item);
    res.send(item);
}
exports.GetProductTop10 = async (req,res)=>{
    try {
        let Top10Product =  await ProductModel.find().sort({"sold":-1}).limit(10);
        res.status(200).json(Top10Product);
    }catch (err){
        return res.status(500).json({message:" đã xảy ra lỗi"})
    }
}
