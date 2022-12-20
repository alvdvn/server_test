const ProductModel =require('../models/product.model');
const FavoriteModel =require('../models/favorite.model');
exports.GetListFavorite =async (req,res)=>{
    const userId = req.user._id;
try {
const GetListFavor = await FavoriteModel.find({userId:userId});
if (GetListFavor == null){
    return res.status(404).json({message:"Không tìm thấy bản ghi"});
}
return res.status(200).json(GetListFavor);
}catch (error){
    return res.status(500).json({
        message:error.message
    })
}
}
exports.GetFavoriteOne =async (req,res)=>{
    const productId =req.params.id;
    const userId = req.user._id;

    let dieu_kien={
        userId,
        productId
    }
    try {
        const FindFavor = await FavoriteModel.findOne(dieu_kien);
        if (FindFavor == null){
            return res.status(404).json({message:"Không tìm thấy bản ghi"})
        }
      return res.status(200).json(FindFavor)
    }catch (error){
        return res.status(500).json({
            message:error.message
        })
    }
}
exports.PostAddFavorite=async (req,res)=>{
  const productId =req.params.id;
  const userId = req.user._id;

  try {
      let ProductInfo = await ProductModel.findById(productId);
      if (ProductInfo ==null){
          return res.status(404).json({message:"Không tìm thấy bản ghi"})
      }
      const newFavor = await FavoriteModel.create({
          userId,
          productId,
          title:ProductInfo.title,
          ProductIMG:ProductInfo.img,
          price:ProductInfo.price,
          sold:ProductInfo.sold,
          isFavorite:true
      });
      return res.status(201).json(
          newFavor
      )
  }catch (error){
      return res.status(500).json({
          message:error.message
      })
  }
}

exports.DeleteFavoriteByItemProduct =async (req,res)=>{
  try {
      const productId =req.params.ProductId;
      console.log(productId)
      const userId = req.user._id;
      let dieu_kien ={
          userId,
          productId
      }
      await FavoriteModel.deleteOne(dieu_kien)
      return res.status(200).json({
          message:"Xóa thành công"
      });
  }catch (error){
      return res.status(500).json({
          message:error.message
      })
  }

}
