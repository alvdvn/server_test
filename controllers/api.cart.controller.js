const CartModel =require('../models/cart.model');
const ProductModel =require('../models/product.model');


exports.postAddCart = async (req,res)=> {
    const { productId,quantity } = req.body;

    const userId = req.user._id;

    try {
        let cart = await CartModel.findOne({ userId });
        let productItem = await ProductModel.findById(productId);
        console.log(productItem);
        if (cart) {
            //cart exists for user
            let itemIndex = cart.products.findIndex(p => p.productId == productId);

            if (itemIndex > -1) {
                //product exists in the cart, update the quantity
                let productItem = cart.products[itemIndex];
                productItem.quantity = quantity;
                productItem.price *=quantity;
                cart.products[itemIndex] = productItem;
                cart.Total = cart.products.map(item =>item.price).reduce((acc, next) => acc + next);
            } else {
                //product does not exists in cart, add new item
                cart.products.push({
                    productId,
                    quantity ,
                    title:productItem.title,
                    price:productItem.price*quantity,
                    ProductIMG:productItem.img,
                });
                cart.Total = cart.products.map(item =>item.price).reduce((acc, next) => acc + next);
            }
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            //no cart for user, create new cart
            const newCart = await CartModel.create({
                userId,
                products: [{
                    productId,
                    quantity,
                    title:productItem.title,
                    price:productItem.price*quantity,
                    ProductIMG:productItem.img
                     }],
                Total:productItem.price*quantity
            });

            return res.status(201).send(newCart);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}


// get all list cart by userID
exports.getAllCartByUserID = async (req,res)=>{
const user =req.user
    let cart =await CartModel.findOne({userId:user._id})
    res.status(200).send(cart);
}
exports.DeleteCartItem =async (req,res)=>{
    const user = req.user
    const { productId } = req.body
    const cart = await CartModel.findOne({
        userId: user._id
    })
    if (!cart) {
        res.json({ success: true });
    }
    const productIndex = cart.products.findIndex(item => String(item.productId) === productId )
    if (productIndex < 0) {
        return res.json({ success: true });
    }
    const newItems = cart
        .products
        .splice(productIndex, 1);
    await CartModel.updateOne({
        _id: cart._id
    }, {
        $set: {
            products: newItems
        }
    })
    return res.json({ success: true });
}