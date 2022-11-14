const orderModel = require("../models/order.model");
const userModel = require("../models/user.model");

exports.getFormlistOrder = async (req, res, next)=>{
    const listOrder = await orderModel.find();
    res.render('./orders/orderList',{listOrder:listOrder});
}

exports.getFormDetaiOrder =async (req,res)=>{
let UserOderData =await orderModel.findById(req.params.id).exec().
catch(function (err) {
    console.log(err);
});
const userItems =UserOderData.products.map( function (item) {
    return item;
} )
    console.log(UserOderData);
    if (UserOderData ==null){
        res.send('Không tìm thấy bản ghi');
    }
    res.render('./orders/detailOrder',{UserOderData:UserOderData});
}
//edit detail order
exports.PostDetailOrder = (req,res)=>{
    let dieu_kien ={
        _id: req.params.id
    }
    let du_lieu ={
        status :req.body.status
    }
    orderModel.updateOne(dieu_kien,du_lieu,function (err,res){
        if (err){
            console.log("Loi update"+err.message,{msg:'Lỗi update'})
        }
    });
    res.redirect('/order/listorder');
}
//get form
exports.postDeleteOrder=(req,res,next)=>{

    let dieu_kien ={
        _id : req.params.id // lay id tren thanh dia chi
    }

    //goi lenh update
    orderModel.deleteOne(dieu_kien,function (err,res){
        if (err)
        {
            console.log("Loi del"+err.message,{msg:'Lỗi del'})
        }
    })
    res.redirect('/order/listorder');
}