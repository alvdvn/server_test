const CartModel =require('../models/cart.model');
const ProductModel =require('../models/product.model');

const calcTotalCartPrice = (cart) => {
    let totalPrice = 0;
    cart.products.forEach((item) => {
        totalPrice += item.quantity * item.price;
    });
    cart.Total = totalPrice;
    return totalPrice;
};

exports.postAddCart = async (req,res)=> {
    const { productId,quantity ,size,color} = req.body;

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
                productItem.price ;
                cart.products[itemIndex] = productItem;
                cart.Total = calcTotalCartPrice(cart)
            } else {
                //product does not exists in cart, add new item
                cart.products.push({
                    productId,
                    quantity ,
                    title:productItem.title,
                    price:productItem.price,
                    ProductIMG:productItem.img,
                    size,
                    color,
                });
                cart.Total = calcTotalCartPrice(cart)
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
                    price:productItem.price,
                    ProductIMG:productItem.img,
                    size,
                    color,
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
    // return res.json({ success: true, cart })
}

exports.updateCartItemQuantity= async (req,res)=>{
    const itemId = req.params.itemId;
    const user = req.user;
    const {quantity} =req.body;
//check xem có giỏ hàng của người dùng này không
 const cart =await  CartModel.findOne({userId:user._id});
 //check và trả về nếu không có người dùng
if (!cart){
    return res.status(404).json({
        status:false,
        message:"giỏ hàng người dùng này không tồn tại"
    });
}
    const itemIndex = cart.products.findIndex(
        (item) => item._id.toString() === itemId
    );
 //check xem ở vị trí itemIndex xem có data ko neu co thi su li khong thi tra ve loi
    if (itemIndex >-1){
        const cartItem =cart.products[itemIndex];
        cartItem.quantity =quantity;
        cart.products[itemIndex]=cartItem;
    }else {
        return res.status(404).json({
            status:false,
            message:"không có item nào đúng với cái id này"
        })
    }
    calcTotalCartPrice(cart);
    await cart.save();
    res.status(200).json({
        status:true,
        numOfCartItems: cart.products.length,
        data:cart
    });
}

exports.DeleteCartItem =async (req,res)=>{
    const user = req.user

    const itemId = req.params.itemId;
    const cart = await CartModel.findOneAndUpdate(
        { userId: user._id },
        {
            $pull: { products: { _id: itemId} },
        },
        { new: true }
    );
    calcTotalCartPrice(cart)
    cart.save();
    res.status(200).json({
        status: 'success',
    });
}
