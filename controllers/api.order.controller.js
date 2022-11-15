const CartModel =require('../models/cart.model');
const OrderModel =require('../models/order.model');
const ProductModel =require('../models/product.model');
var FCM = require('fcm-node');
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
        name:req.body.name,
        phoneNumber:req.body.phoneNumber,
        products:cart.products,
        address:req.body.address,
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
         await CartModel.findByIdAndDelete(cartId);
    }

    var message = {
        to:"/topics/"+user._id,
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
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!", err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
    res.status(201).json({
        status:true,
        Order
    });
}

exports.GetAllOrderByUser= async(req,res)=>{
const user = req.user._id;
    if (user == null){
        return res.status(404).json({
            message:"Không tìm thấy user"
        });
    }
    let FindOrderbyUser = await OrderModel.find({userId: user});
    if (FindOrderbyUser ==null){
        return res.status(404).json({message:"người dùng không đơn đặt hàng nào"});
    }
    res.status(200).json(FindOrderbyUser);

}

exports.GetDetailOrder=async (req,res)=>{
    const orderId = req.params;
    console.log(orderId);
    let FindOrderById = await OrderModel.findOne(orderId);
    console.log(FindOrderById);
    if (FindOrderById ==null){
        return res.status(404).json({message:"Không tìm thấy đơn hàng nào"});
    }
    res.status(200).json(FindOrderById);

}