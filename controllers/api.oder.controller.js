const CartModel =require('../models/cart.model');
const OrderModel =require('../models/order.model');
const ProductModel =require('../models/product.model');
exports.PostCashOrder= async(req, res)=>{
    const cartId = req.params.cartId;
    const user = req.user;
    console.log(user);
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
        Total:cart.Total
    });
    // nếu order thành công thì tiến hàng trừ stock = quanty
    if (Order){
        const bulkoption = cart.products.map((item)=>({
            updateOne: {
                filter:{_id:item.productId},
                update:{$inc:{stock:-item.quantity}},
            },
        }));
        await ProductModel.bulkWrite(bulkoption,{});
        await CartModel.findByIdAndDelete(cartId);
    }
    res.status(201).json({
        status:true,
        Order
    });
}