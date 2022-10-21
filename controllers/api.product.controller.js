const productModel = require('../models/product.model');
exports.getApiProduct= async (req,res,next) =>{
    const  itemList = await productModel.find();
    res.send(itemList)
}
exports.GetOne = async (req,res,next)=>{
    let item = await  productModel.findById(req.body.idproduct)
        .exec().catch(err=>{
            console.log(err)
        });
    if (item == null){
        console.log("khong tim thay id");
    }
    console.log(item);
    res.send(item);
}