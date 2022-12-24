const categoryModel = require('../models/category.model');
const productModel = require('../models/product.model');
exports.getApiCategory = async (req,res,next) =>{
    const  itemList = await categoryModel.find();
    res.send(itemList)
}
exports.getAllProductByCategory =async (req,res)=>{
//lay id cate theo params
        try{
            let item = await  categoryModel.findById(req.params.id);
            if (item ==null){
                return res.status(400).json({
                    status:false,
                    message:"Không có cate nào như vậy"
                });}
            const allItemMatch = await productModel.find({category: item.title});
           res.status(200).json(allItemMatch);
        }catch (e){
            return res.status(400).json({
                status:false,
                message:e
            });
        }

    // find title params theo id
    //lay tat ca cac product thep cate
}