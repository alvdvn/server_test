const orderModel = require("../models/order.model");
const userModel = require("../models/user.model");
var FCM = require('fcm-node');
const notiModel = require("../models/notification.model");
const CartModel = require("../models/cart.model");
const ProductModel = require("../models/product.model");
const OrderModel = require("../models/order.model");
var serverKey = 'AAAA4oos57k:APA91bFyYJ2fZEP7jlGULUwC0NSc4VEFk86XTIx21ZX6f13LUbI1VyYGb0vS-7_ipjyi_-tOMMuk4PwtvveR_0fjixNC3ZcLEXbyGiQVoWO3VRX0xfUJknZ6Yico7YrhbBCA6oux6RTz';
var fcm = new FCM(serverKey);

exports.getFormlistOrder = async (req, res, next)=>{
    const listOrder = await orderModel.find();
    res.render('./orders/orderList',{listOrder:listOrder});

}
exports.getFormlistOrderByStatus = async (req, res)=>{

    const listOrder = await orderModel.find({status:req.params.status});
    res.render('./orders/orderListByStatus',{listOrder:listOrder});

}

exports.getFormDetaiOrder =async (req,res)=>{
let UserOderData =await orderModel.findById(req.params.id).exec().
catch(function (err) {
    console.log(err);
});


    console.log(UserOderData);
    if (UserOderData ==null){
        res.send('Không tìm thấy bản ghi');
    }
    res.render('./orders/detailOrder',{UserOderData:UserOderData});
}
//edit detail order
exports.PostDetailOrder = async (req,res)=>{
   try {
       const {status} = req.body;
       let dieu_kien ={
           _id: req.params.id
       }
       let du_lieu ={};

       if (status === "Giao hàng thành công"){
           du_lieu={
               status,
               isPaid:true
           }
       }
       else if (status === "người dùng đã hủy đơn hàng"){
           const FindByOrderId = await OrderModel.findById(dieu_kien);
           const bulkoption = FindByOrderId.products.map((item)=>({
               updateOne: {
                   filter:{_id:item.productId},
                   update:{$inc:{stock:+item.quantity,sold: -item.quantity}},
               },
           }));
           await ProductModel.bulkWrite(bulkoption,{});
           du_lieu={
               status,
           }
       }
       else {
           du_lieu={
               status,
           }

       }
       //id user
      orderModel.updateOne(dieu_kien,du_lieu,function (err,res){
           if (err){
               console.log("Loi update"+err.message,{msg:'Lỗi update'})
           }
       });


       const getIdOrder = await orderModel.findById({_id:req.params.id});
       console.log(getIdOrder)
       let id = getIdOrder.userId;
       let idOrder = getIdOrder._id;
       let message={};
       let trangthai ;
       if (getIdOrder.status =="người dùng đã hủy đơn hàng"){
           trangthai = "Đơn hàng đã hủy"
           message = {
               to:"/topics/"+id,
               collapse_key: 'your_collapse_key',

               notification: {
                   title: "Trạng thái đơn hàng",
                   body: "Đơn hàng id: "+idOrder+" đã chuyển thành "+trangthai,
                   image: getIdOrder.products[0].ProductIMG
               },

               data: {
                   my_key: 'my value',
                   my_another_key: 'my another value'
               }
           };
       }else {
           trangthai = getIdOrder.status
            message = {
               to:"/topics/"+id,
               collapse_key: 'your_collapse_key',

               notification: {
                   title: "Trạng thái đơn hàng",
                   body: "Đơn hàng id: "+idOrder+" đã chuyển thành "+trangthai,
                   image: getIdOrder.products[0].ProductIMG
               },

               data: {
                   my_key: 'my value',
                   my_another_key: 'my another value'
               }
           };
       }


       let nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
       let date_nz = new Date(nz_date_string);
       let hours = ("0" + date_nz.getHours()).slice(-2);
       let minutes = ("0" + date_nz.getMinutes()).slice(-2);
       let timenow = hours + ":" + minutes;

       fcm.send(message, async function (err, response) {
           if (err) {
               console.log("Something has gone wrong!", err);
           } else {
               console.log("Successfully sent with response: ", response);

               const noti = new notiModel({
                   userId:id,
                   title: trangthai,
                   body: "Đơn hàng id: " + idOrder + " đã chuyển trang thái thành " + trangthai,
                   image: getIdOrder.products[0].ProductIMG,
                   time: timenow,
                   typenotificaton:"user"
               });
               noti.save((err) => {
                   if (err) {
                       console.log("err add")
                   } else {
                       console.log("add succes")
                   }
               })
           }
       });
       res.redirect('/order/listorder');
   }catch (err){
       res.redirect('/order/listorder');
   }
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