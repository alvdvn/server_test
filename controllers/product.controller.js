const  productModel = require('../models/product.model');
// const  bcrypt = require('bcrypt');
const fs = require('fs')
const  cateModel = require('../models/category.model')
const Console = require("console");
const  path = require('path');
const util = require('util');
const  multer = require('multer')

exports.getListProduct = async (req,res,next)=>{
    const listProduct = await productModel.find().exec();

    res.render('./products/list',{listProduct:listProduct});

}
exports.getFormAddPro = async (req,res,next)=>{
    const listCate = await cateModel.find().exec();
    const listSize = new Array("S","M","L","XL","XXl","XXXl")
    const sizeLength = listSize.length;
    res.render('./products/add',{listCate:listCate,listSize:listSize,sizeLength});
}
exports.postAddPro = async (req,res,next ) => {
    console.log(req.body);
    console.log(req.file.filename)
    // let storage = multer.diskStorage({
    //     destination: (req,file,callback) =>{
    //         callback(null,path.join('./uploads'));
    //     },
    //     filename: (req,file,callback) =>{
    //         let math = ["image/png","image/jpeg"];
    //         if(math.indexOf(file.mimetype)===-1){
    //             let  mss = ' vui long upload file png hoac jpeg'
    //             return callback(mss,null)
    //         }
    //         let filename = 'http://localhost:3000/uploads/' + req.file.originalname;
    //         callback(null,filename);
    //     }
    //
    // });
    // let listImage = multer({storage:storage}).array('img',5);
    // let multipleUploadMiddleware = util.promisify(uploadManyFiles);
    // module.exports = multipleUploadMiddleware;
    //
    // try {
    //     fs.rename(req.file.destination + req.file.filename,
    //         './public/uploads/' + req.file.originalname,
    //         function (err){
    //             if(err){
    //                 console.log(err)
    //             }
    //         }
    //     )
    // }catch (err){
    //     return res.render('./products/add',{msg:"Vui lòng thêm ảnh"})
    // }
    // const filename = 'http://localhost:3000/uploads/'+req.file.originalname;
    // const  sel = req.body.form("select").value;
    // const  listImg = new Array(filename);

    // for (var i=0;i<listImg.size;i++){
    //     listImg[i] ='http://localhost:3000/uploads/'+listImg[i];
    // }
    // var listimg = new Array();
    // listimg.push(req.file)
    // var listfirename = new Array();

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
        const filename = 'https://mofshop.shop/uploads/'+req.file.originalname;
        // listfirename.push(filename);

    console.log( req.body.cate);
    const product = new productModel({
        title : req.body.title,
        price : req.body.price,
        desc  : req.body.desc,
        category: req.body.cate,
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
        const filename = 'https://mofshop.shop/uploads/'+req.file.originalname;

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