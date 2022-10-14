const  productModel = require('../models/model.Product');
// const  bcrypt = require('bcrypt');
const fs = require('fs')
const Console = require("console");
exports.getListProduct = async (req,res,next)=>{
    const listProduct = await productModel.find().exec();
    res.render('./products/list',{listProduct:listProduct});

}
exports.getFormAddPro = (req,res,next)=>{
    res.render('./products/add');
}
exports.postAddPro = async (req,res,next ) => {
    console.log(req.body);

    if (req.body.title.length == 0 && req.body.price.length == 0
        && req.body.desc.length == 0 && req.body.sizes.length==0.
        && req.body.color.length== 0 && req.body.stock.length == 0) {
        return res.render('./products/add', {msg: "Vui lòng nhập đủ thông tin trước khi thêm "})

    }
    // try {
    //     fs.rename(req.file.destination + req.file.filename,
    //         './public/uploads/') + req.file.originalname,
    //         function (err) {
    //             if (err)
    //             console.log(err);
    //         }
    // } catch (err) {
    //     return  res.render('./products/add',{msg: "Vui long them anh "})
    // }
    // const filename = req.body.file.originalname;
    const product = new productModel({
        title : req.body.title,
        price :  req.body.price,
        desc  : req.body.desc,
        size  : req.body.size,
        color : req.body.color,
        stock : req.body.stock,
        img :   req.body.img
    });
    await  product.save((err) =>{
        if(err){
            console.log("loi add")
        }else {
            console.log("success")
        }
    })
    res.redirect('/pro/add');
}