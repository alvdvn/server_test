const commentModel = require('../models/comment.model');
const ProductModel = require('../models/product.model');
const UserModel = require('../models/user.model');
exports.postAddComment= async (req,res)=>{
const ProductID = req.params.id;
const userId = req.user._id;
const {ratingStar,commentDes,likes,CmtImg}=req.body;
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
        if (itemProduct){
            const addComment = await commentModel.create({
                productId:itemProduct._id,
                comments:[{
                    userId:user._id,
                    ratingStar:Number(ratingStar),
                    commentDes,
                    CmtImg:[{CmtImg}],
                    likes: Number(likes)
                    }]
            });
            res.status(200).send({
                status:true,
                message:"Thêm bình luân thành công",
                addComment
            });
        }else {
            res.status(401).json({
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