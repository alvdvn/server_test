const commentModel = require('../models/comment.model');
const ProductModel = require('../models/product.model');
const UserModel = require('../models/user.model');
const fs = require("fs");
const {resolve} = require("path");
exports.postAddComment= async (req,res)=>{
    const ProductID = req.params.id;
    const userId = req.user._id;
    const {ratingStar,commentDes}=req.body;
    let  FolderToUpload="aaaaaaaa";
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

        const  imageDirPath = resolve(__dirname,'../tmp');
        const  files = fs.readdirSync(imageDirPath);
        const  nameFolder = FolderToUpload.replace(" ",'-');
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
        nameImages = files_info.map((file,index)=>"http://localhost:3000/uploads/"+newNameDir
            +'/'+date+"anh"+index+".png");

        if (itemProduct){
            const addComment = await commentModel.create({
                productId:itemProduct._id,
                    userId:user._id,
                    ratingStar:Number(ratingStar),
                    commentDes,
                    CmtImg:nameImages,

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