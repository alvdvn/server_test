const CartModel =require('../models/cart.model');

exports.postAddCart = async (req,res)=>{
const { productId,quantity } =req.body;
const user =req.user
    let cart = await CartModel.findOne({idUser:user._id})
    if (!cart){
        cart = new  CartModel({
            idUser:user._id,
            products:[
                {
                    productId:req.body.productId,
                    title:req.body.title,
                    price:Number(req.body.price),
                    img:req.body.img,
                    quantity,
                    Amount:Number(req.body.Amount)
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
              price:Number(req.body.price),
              img:req.body.img,
              quantity:Number(req.body.quantity),
              Amount:Number(req.body.Amount)
          }
        };
    }
    await CartModel.updateOne({
        _id:cart._id,
    },dataUpdate);
    return res.json({success:true,dataUpdate});
}