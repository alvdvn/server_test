const CommentModel = require("../models/comment.model");

exports.getFormComment= async (req,res)=>{
    const  itemList = await CommentModel.find();
    res.render("./Comment/comment-list",{itemList:itemList} )
}
exports.postDel=(req,res,next)=>{
    console.log(req.params);

    let dieu_kien ={
        _id : req.params.id // lay id tren thanh dia chi
    }
    //goi lenh update
    CommentModel.deleteOne(dieu_kien,function (err,res){
        if (err)
        {
            console.log("Loi del"+err.message,{msg:'Lỗi del'})
        }
    })
    res.redirect('/comment/list')
}