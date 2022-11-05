const commentModel = require('../models/comment.model');
const ProductModel = require('../models/product.model');
const UserModel = require('../models/user.model');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

exports.postAddComment= async (req,res)=>{
    const ProductID = req.params.id;
    const userId = req.user._id;
    const {ratingStar,commentDes}=req.body;

try {
    let user = await UserModel.findById(userId);
    if (user == null){
        return res.status(401).json({
            status:false,
            message:"không tìm thấy người viết bài viết này"
        });
    }
    else { // nếu đã có user thì tiếp tục sử lý thêm cmt
        let itemProduct = await ProductModel.findById(ProductID);
        const uploader = async (path)=> await cloudinary.uploads(path,'Comment');
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
        if (itemProduct){
            const addComment = await commentModel.create({
                productId:itemProduct._id,
                    userId:user._id,
                    ratingStar:Number(ratingStar),
                    commentDes,
                    CmtImg:filename,
            });
            res.status(200).send({
                status:true,
                message:"Thêm bình luân thành công",
                addComment,
            });
         }
        else
         {
            res.status(500).json({
                status:false,
                message:"Thêm không thành công"
            })
        }
    }
}catch (err){
    res.status(500).json({
        status:false,
        message:err
    })
}

}

exports.getAllComment =async (req,res)=>{
    const ProductID = req.params.id;
      try {
const ProductItems = await commentModel.find({productId: ProductID});

         if (ProductItems ==null){
             return res.status(401).send({
                 status:false,
                 message:"Không tìm thấy comment nào"
             })
         }else {
             let AVG =0;
             let dem=0;
             let SUM =0
             for (let i = 0; i < ProductItems.length; i++) {
                 dem++;
                 SUM += ProductItems[i].ratingStar;
             }
             AVG = SUM/dem;
             res.status(200).send({
                 status:true,
                 AVG,
                 dem,
                 ProductItems,
             })
         }

      }catch (err){
          res.status(500).send({
              status:false,
              message:err.message
          })
      }

}
