const  productModel = require('../models/product.model');
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
    console.log(req.file)

    try {
        fs.rename(req.file.destination + req.file.filename,
            './public/uploads/' + req.file.originalname,
            function (err){
                if(err){
                    console.log(err)
                }
            }
        )
    }catch (err){
        return res.render('./products/add',{msg:"Vui lòng thêm ảnh"})
    }
    const filename = 'http://localhost:3000/uploads/'+req.file.originalname;

    const product = new productModel({
        title : req.body.title,
        price : req.body.price,
        desc  : req.body.desc,
        sizes  : req.body.sizes,
        color : req.body.color,
        stock : req.body.stock,
        img   :   filename
    });


    await  product.save((err) =>{
        if(err){
            console.log("loi add")
        }else {
            console.log("success")
        }
    })
    res.redirect('/pro/list');
}
exports.getFormEditPro = async (req,res,next) =>{
    // console.log(req.params);
    let  itemPro = await  productModel.findById(req.params.id)
        .exec()
        .catch(function (err){
           console.log(err)
        });

    if(itemPro==null){
        res.send('khong tim thay')
    }

    res.render('./products/editpro',{itemPro:itemPro})

}
exports.postEditPro = async (req,res,next) => {
    console.log(req.params);

    let dieu_kien ={
        _id : req.params.id // lay id tren thanh dia chi
    }
    let  itemPro = await  productModel.findById(req.params.id)
        .exec()
        .catch(function (err){
            console.log(err)
        });
    var filename = itemPro.img;
    if(req.file.filename != null){
        try {
            fs.rename(req.file.destination + req.file.filename,
                './public/uploads/' + req.file.originalname,
                function (err){
                    if(err){
                        console.log(err)
                    }
                }
            )
        }catch (err){
            return res.render('./products/edit',{msg:"Vui lòng thêm ảnh"})
        }
        const filename = 'http://localhost:3000/uploads/'+req.file.originalname;

    }

    let du_lieu = {
        title : req.body.title,
        price : req.body.price,
        desc  : req.body.desc,
        sizes  : req.body.sizes,
        color : req.body.color,
        stock : req.body.stock,
        img   :   filename
    }

    //goi lenh update
    productModel.updateOne(dieu_kien,du_lieu,function (err,res){
        if (err)
        {
            console.log("Loi update"+err.message,{msg:'Lỗi update'})
        }
    })

    res.redirect('/pro/list');
}
exports.postDelPro = async (req,res,next) =>{

    console.log(req.params.id)
    let dieu_kien ={
        _id : req.params.id
    }


    productModel.deleteOne(dieu_kien,function (err,res){
        if (err)
        {
            console.log("Loi del"+err.message,{msg:'Lỗi del'});
        }
    });
    res.redirect('/pro/list');

}