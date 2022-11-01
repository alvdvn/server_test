const productModel = require('../models/product.model');
// const  bcrypt = require('bcrypt');
const fs = require('fs')
const cateModel = require('../models/category.model')


exports.getListProduct = async (req, res, next) => {
    const listProduct = await productModel.find().exec();

    res.render('./products/list', {listProduct: listProduct});

}
exports.getFormAddPro = async (req, res, next) => {
    const listCate = await cateModel.find().exec();
    const listSize = new Array("S", "M", "L", "XL", "XXl", "XXXl")
    const sizeLength = listSize.length;
    res.render('./products/add', {listCate: listCate, listSize: listSize, sizeLength});
}
exports.postAddPro = async (req, res, next) => {
    console.log(req.body);
    console.log(req.file.filename);
    function removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
        str = str.replace(/\u02C6|\u0306|\u031B/g, "");
        str = str.trim();
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        return str;
    }
    const  nameFolder = req.body.title.replace(" ",'-');
    let newNameDir = removeVietnameseTones(nameFolder);
    var  dir = './public/uploads/'+ newNameDir;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
        console.log("Tao folder:"+dir);
    }else {
        console.log("Directory already exist");
    }
    let  date = Date.now();

    try {
        fs.rename(req.file.destination + req.file.filename,
            './public/uploads/' +newNameDir+'/'+date+".png",
            function (err) {
                if (err) {
                    console.log(err)
                }
            }
        )
    } catch (err) {
        return res.render('./products/add', {msg: "Vui lòng thêm ảnh"})
    }
    const filename = 'https://mofshop.shop/uploads/' +newNameDir+'/'+date+".png";

    console.log(req.body.cate);
    const product = new productModel({
        title: req.body.title,
        price: req.body.price,
        desc: req.body.desc,
        category: req.body.cate,
        sizes: req.body.sizes,
        color: req.body.color,
        stock: req.body.stock,
        img: filename
    });


    await product.save((err) => {
        if (err) {
            console.log("loi add")
        } else {
            console.log("success")
        }
    })
    res.redirect('/pro/list');
}
exports.getFormEditPro = async (req, res, next) => {
    // console.log(req.params);
    let itemPro = await productModel.findById(req.params.id)
        .exec()
        .catch(function (err) {
            console.log(err)
        });

    if (itemPro == null) {
        res.send('khong tim thay')
    }

    res.render('./products/editpro', {itemPro: itemPro})

}
exports.postEditPro = async (req, res, next) => {
    console.log(req.params);

    let dieu_kien = {
        _id: req.params.id // lay id tren thanh dia chi
    }
    let itemPro = await productModel.findById(req.params.id)
        .exec()
        .catch(function (err) {
            console.log(err)
        });
    var filename = itemPro.img;
    if (req.file.filename != null) {
        try {
            fs.rename(req.file.destination + req.file.filename,
                './public/uploads/' + req.file.originalname,
                function (err) {
                    if (err) {
                        console.log(err)
                    }
                }
            )
        } catch (err) {
            return res.render('./products/edit', {msg: "Vui lòng thêm ảnh"})
        }
        const filename = 'https://mofshop.shop/uploads/' + req.file.originalname;

    }

    let du_lieu = {
        title: req.body.title,
        price: req.body.price,
        desc: req.body.desc,
        sizes: req.body.sizes,
        color: req.body.color,
        stock: req.body.stock,
        img: filename
    }

    //goi lenh update
    productModel.updateOne(dieu_kien, du_lieu, function (err, res) {
        if (err) {
            console.log("Loi update" + err.message, {msg: 'Lỗi update'})
        }
    })

    res.redirect('/pro/list');
}
exports.postDelPro = async (req, res, next) => {

    console.log(req.params.id)
    let dieu_kien = {
        _id: req.params.id
    }


    productModel.deleteOne(dieu_kien, function (err, res) {
        if (err) {
            console.log("Loi del" + err.message, {msg: 'Lỗi del'});
        }
    });
    res.redirect('/pro/list');

}