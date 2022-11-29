const productModel = require("../models/product.model");
const fs = require("fs");
const cloudinary = require("../utils/cloudinary");

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
exports.postUpload= async (req,res)=>{
  try {
      let condition = {_id: req.params.id};
      const uploader = async (path)=> await cloudinary.uploads(path);
      const urls =[]
      const files =req.files
      for (const file of files){
          const {path} =file
          const newPath =await uploader(path)
          urls.push(newPath)
          fs.unlinkSync(path)}
      const filename = urls.map(function (item) {
          return item.url;
      })

      let obj ={
          img_product:filename,
      }
      await productModel.updateOne(condition,obj).then(function (err,result){
          if (err){
               return res.status(500).render('./products/upload',{msg:' da xay ra loi'})
              console.log(err)
          }else {
              return res.status(200).render('./products/upload',{msg:' đã thành công'})
          }
      })

      return res.redirect('/pro/list');
  }catch (e){
      console.log(e.message);
  }
}