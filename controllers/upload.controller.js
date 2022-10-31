const productModel = require("../models/product.model");
const fs = require("fs");
const {resolve} = require("path");

exports.getFormUpload = async (req,res,next)=>{
    console.log(req.params)
    let Book = await productModel.findById(req.params.id)
        .exec()
        .catch(function (err){
            console.log(err)
        });
    console.log(Book);
    if (Book==null){
        res.send('Khong tim thay')
    }
    res.render('./products/upload',{Book:Book})
}
exports.postUpload= async (req,res,next)=>{
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

    console.log(req.files)
    let condition = {_id: req.params.id};
    const  book = await  productModel.findById(req.params.id).exec()
        .catch(err=>{
            console.log(err);
        });
    if (book == null){
        return log("Comics not found");
    }
    console.log(req.files);
    const  imageDirPath = resolve(__dirname,'../tmp');
    const  files = fs.readdirSync(imageDirPath);
    const  nameFolder = book.title.replace(" ",'-');
    let newNameDir = removeVietnameseTones(nameFolder);
    var  dir = './public/uploads/'+ newNameDir;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
        console.log("Tao folder:"+dir);
    }else {
        console.log("Directory already exist");
    }
    let nameImages = [];
    let  date = Date.now();
    await files.forEach((file,index)=>{
        fs.renameSync(imageDirPath+`/${file}`,'./public/uploads/'+newNameDir+'/'+date+"anh"+index+".png",
            function (err){
                if (err){
                    console.log(err)
                }
            })
    });
    const  files_info = req.files;
    nameImages = files_info.map((file,index)=>"https://mofshop.shop/uploads/"+newNameDir
        +'/'+date+"anh"+index+".png");
    let obj ={
        title:book.title,
        price:book.price,
        desc:book.desc,
        category:book.category,
        sizes:book.sizes,
        color:book.color,
        stock:book.stock,
        img:book.img,
        img_product:nameImages,
    }
    productModel.updateOne(condition,obj,function (err,result){
        if (err){
            console.log(err);
        }else {
            console.log("Thêm thành công")
        }
    });
    return res.redirect('/pro/list')

}