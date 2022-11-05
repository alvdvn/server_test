const bannerModel = require('../models/banner.model');
const IMGModel =require('../models/Img.model');
const {streamUpload} =require('../utils/UploadIMG');
exports.getApiBanner = async (req,res,next) =>{
    const  itemList = await bannerModel.find();
    res.send(itemList)
}
exports.postIMG = async (req,res)=>{
    const result = await streamUpload(req);
    let filename = result.url;
    const imgUpload = await IMGModel.create({
        IMG:filename
    });
    res.status(200).json({
        imgUpload
    })

}