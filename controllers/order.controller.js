const orderModel = require("../models/order.model");
const userModel = require("../models/user.model");
var FCM = require('fcm-node');
var serverKey = 'AAAA4oos57k:APA91bFyYJ2fZEP7jlGULUwC0NSc4VEFk86XTIx21ZX6f13LUbI1VyYGb0vS-7_ipjyi_-tOMMuk4PwtvveR_0fjixNC3ZcLEXbyGiQVoWO3VRX0xfUJknZ6Yico7YrhbBCA6oux6RTz';
var fcm = new FCM(serverKey);

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
exports.PostDetailOrder = async (req,res)=>{
    let dieu_kien ={
        _id: req.params.id
    }


    let du_lieu ={
        status :req.body.status
    }
    //id user
    orderModel.updateOne(dieu_kien,du_lieu,function (err,res){
        if (err){
            console.log("Loi update"+err.message,{msg:'Lỗi update'})
        }
    });
    const getIdOrder = await orderModel.findById({_id:req.params.id});
    let id = getIdOrder.userId;
    let idOrder = getIdOrder._id;
    let trangthai = getIdOrder.status;

    var message = {
        to:"/topics/"+id,
        collapse_key: 'your_collapse_key',

        notification: {
            title: "Trạng thái đơn hàng",
            body: "Đơn hàng id: "+idOrder+" đã chuyển thành "+trangthai,
            image: "https://blog.abit.vn/wp-content/uploads/2020/12/giao-hang-lazada-3-compressed.jpg"
        },

        data: {
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
    console.log(message)
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!", err);
        } else {
            console.log("Successfully sent with response: ", response);
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