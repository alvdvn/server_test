const CartModel =require('../models/cart.model');
const OrderModel =require('../models/order.model');
const ProductModel =require('../models/product.model');
var FCM = require('fcm-node');
const notiModel = require("../models/notification.model");
var serverKey = 'AAAA4oos57k:APA91bFyYJ2fZEP7jlGULUwC0NSc4VEFk86XTIx21ZX6f13LUbI1VyYGb0vS-7_ipjyi_-tOMMuk4PwtvveR_0fjixNC3ZcLEXbyGiQVoWO3VRX0xfUJknZ6Yico7YrhbBCA6oux6RTz';
var fcm = new FCM(serverKey);

exports.PostCashOrder= async(req, res)=>{
    //conver time to viet nam time
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh'
    })

    const cartId = req.params.cartId;
    const user = req.user;
    //get cart == cartId
    const cart = await CartModel.findById(cartId);
    if (!cart){
        return res.status(404).json({
            status:false,
            message:"Không tìm thấy giỏ hàng với id như thế"
        });
    }

    // Create order with defau paymentType cash
    const Order =await OrderModel.create({
        userId:user._id,
        name:user.full_name,
        phoneNumber:user.phone_number,
        products:cart.products,
        address:user.address,
        Total:cart.Total,
        CreatedAt:nDate
    });
    // nếu order thành công thì tiến hàng trừ stock = quanty
    if (Order){
        const bulkoption = cart.products.map((item)=>({
            updateOne: {
                filter:{_id:item.productId},
                update:{$inc:{stock:-item.quantity,sold: +item.quantity}},
            },
        }));
        await ProductModel.bulkWrite(bulkoption,{});
        // await CartModel.findByIdAndDelete(cartId);
    }
    var message = {
        to:"/topics/"+user._id,
        // to: 'cdCunu14TDe4DTYohuxS7O:APA91bEoIvYHcmClPjLPJ5Kdt3bgcDBBM8R0ZmyC1mnn8uHWDiLAGCpHFiZByz5X8pMmkX1gvHg8lKF2CiAm1xwCuYA9gbgQJ5cw-fSFcEGM26zmOqrV87_rBj0pkqlSP6kB5mGdjtiz',
        collapse_key: 'your_collapse_key',

        notification: {
            title: "Đặt hàng thành công",
            body: "Cảm ơn bạn đã mua sắm tại app",
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
            console.log("Something has gone wrong!", {msg: 'Lỗi gửi thông báo'});
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
    res.status(201).json({
        status:true,
        Order
    });
}