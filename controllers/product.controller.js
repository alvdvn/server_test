const  productModel = require('../models/model.Product');
// const  bcrypt = require('bcrypt');
const fs = require('fs')
exports.getListProduct = async (req,res,next)=>{
    const listProduct = await productModel.find();
    res.render('./products/list',{listProduct:listProduct});

}
exports.getFormAddPro = (req,res,next)=>{
    res.render('./products/add');
}