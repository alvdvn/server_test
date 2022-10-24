const CartModel =require('../models/cart.model');


exports.postAddCart = async (req,res)=>{
const { productId,quantity } =req.body;
const user =req.user
    let cart = await CartModel.findOne({userId:user._id})
    if (!cart){
        cart = new  CartModel({
            userId:user._id,
            products:[
                {
                    productId:req.body.productId,
                    title:req.body.title,
                    price:req.body.price,
                    img:req.body.img,
                    quantity,
                    Amount:req.body.Amount,
                }
            ]
        });
        await cart.save();
        return res.json({success:true,cart})
    }

    const dataUpdate ={};
    const productInCartindex = cart.products.findIndex(item => String(item.productId) === productId);
    if (productInCartindex >= 0){
        dataUpdate.$inc = {
            [`items.${productInCartindex}.quantity`]: quantity
        }
    }else {
        dataUpdate.$push ={
            products:{
              productId :productId,
              title:req.body.title,
              price:req.body.price,
              img:req.body.img,
              quantity:req.body.quantity,
              Amount:req.body.Amount
          }
        };
    }

    await CartModel.updateOne({
        _id:cart. _id,
    },dataUpdate);
    console.log(cart._id);
    return res.json({success:true,dataUpdate});
}
// get all list cart by userID
exports.getAllCartByUserID = async (req,res)=>{
const user =req.user
    let cart =await CartModel.findOne({userId:user._id})
    res.send(cart);
    console.log(cart);
}
exports.DeleteCartItem =async (req,res)=>{
    const user =req.user
    const {productId} =req.body
    console.log(req.params.id)
    const cart =await CartModel.findOne({userId:user._id})
    if (!cart){
        res.json({ success: true });
    }
    const productIndex =cart.products.findIndex(item => String(item.productId)=== productId)
    if (productIndex <0){
        return res.json({success:true});
    }
    const newItems =cart.products.slice(productIndex,1);
    await CartModel.updateOne({
        _id:cart._id
    },
        {
            $set:{
                products:newItems
            }
        })
    return res.json({success:true});
}