const bannerModel = require('../models/banner.model');
const IMGModel =require('../models/Img.model');
exports.getApiBanner = async (req,res,next) =>{
    const  itemList = await bannerModel.find();
    res.send(itemList)
}