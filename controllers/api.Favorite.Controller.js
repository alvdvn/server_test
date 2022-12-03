const ProductModel =require('../models/product.model');
const FavoriteModel =require('../models/favorite.model');
exports.GetListFavorite =async (req,res)=>{
const userId= req.user._id;
    try {
        let FindFavotiteByuser= await FavoriteModel.findOne({userId:userId});
        if (FindFavotiteByuser ==null){
            return res.status(404).json({
                message:"chưa có yêu thích nào"
            });
        }
        res.status(200).json(FindFavotiteByuser);
    }catch (error){
        return res.status(500).json({
            message:error.message
        })
    }
}
exports.PostAddFavorite=async (req,res)=>{
    const ProductId = req.params.id;
    const userId = req.user._id;
    try {
        let FindFavotiteByuser= await FavoriteModel.findOne({userId:userId});
        let productItem = await ProductModel.findById(ProductId)
        console.log(productItem.title);
       if(FindFavotiteByuser) {
           let itemIndex = FindFavotiteByuser.products.findIndex(p => p.productId == ProductId);
           if (itemIndex>-1){
               return res.status(204).json({message:"sản phẩm này đã có trong yêu thích"})
           }else {
         FindFavotiteByuser.products.push({
             productId:ProductId,
             title:productItem.title,
             price:productItem.price,
             ProductIMG:productItem.img,
             isFavorite:true

         });
               FindFavotiteByuser = await FindFavotiteByuser.save();
           return res.status(201).json(FindFavotiteByuser);
           }
        }else {
           let NewFavorite = await FavoriteModel.create({
               userId:userId,
              products:[{
                  productId:ProductId,
                  title:productItem.title,
                  price:productItem.price,
                  ProductIMG:productItem.img,
                  isFavorite:true
              }]
           });
           return res.status(201).json(NewFavorite);
       }
    }catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

exports.DeleteFavorite =async (req,res)=>{
    const itemId = req.params.itemId
    const UserId = req.user._id;
    try {
        let FindFavorite =await FavoriteModel.findOne({userId:UserId});
        if (FindFavorite.products.length >0) {
            const FavoriteDel = await FavoriteModel.findOneAndUpdate(
                {userId: UserId},
                {
                    $pull: {products: {_id: itemId,isFavorite:false}},
                },
                {new: true}
            );
            if (FavoriteDel.products.length == 0) {
                await FavoriteDel.deleteOne();
                console.log("12333333333")
                return res.status(200).json({message: "xóa bản ghi thành công123"})
            }
            return res.status(200).json({message: "xóa bản ghi thành công"})
        }
    }catch (error){
        return res.status(500).json({
            message:error.message
        })
    }

}

exports.DeleteFavoriteByItemProduct =async (req,res)=>{
    const itemProId = req.params.itemProductId;
    const UserId = req.user._id;
    try {
        let FindFavorite =await FavoriteModel.findOne({userId:UserId});
        if (FindFavorite.products.length >0) {
            const FavoriteDel = await FavoriteModel.findOneAndUpdate(
                {userId: UserId},
                {
                    $pull: {products: {productId: itemProId}},
                },
                {new: true}
            );
            if (FavoriteDel.products.length == 0) {
                await FavoriteDel.deleteOne();
                return res.status(200).json({message: "xóa bản ghi thành công (xóa hết)"})
            }
            return res.status(200).json({message: "xóa bản ghi thành công"})
        }
    }catch (error){
        return res.status(500).json({
            message:error.message
        })
    }
}