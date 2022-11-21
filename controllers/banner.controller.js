const bannerModel = require('../models/banner.model');
const {streamUpload} =require('../utils/UploadIMG');
exports.getFormAdd = (req,res,next)=>{
    res.render('./banners/add');
}
exports.postAdd = async (req,res)=>{

        let result = await streamUpload(req);
    if (result ==null){
        return res.render('./banners/edit',{msg:'Chưa chọn file upload '});
    }
    let filename= result.url;
    const banner = new bannerModel({
        description: req.body.description,
         anh : filename,
    });
    await banner.save((err)=>{
        if (err){
            console.log("Loi add")
        } else {
            console.log("add succes")
        }
    })
    res.redirect('/banners/add')
}
exports.getFormList = async (req,res,next) =>{
    const  itemList = await bannerModel.find();
    res.render('./banners/list',{itemList:itemList})
}

exports.getFormEditBanner = async (req,res,next)=>{
    let itemBanner = await bannerModel.findById(req.params.id)
        .exec()
        .catch(function (err){
            console.log(err)
        });
    console.log(itemBanner);
    if (itemBanner==null){
        res.send('Không tìm thấy')
    }
    res.render('./banners/edit',{itemBanner:itemBanner})
}
exports.postEdit= async (req,res,next)=>{
    let dieu_kien ={
        _id : req.params.id // lay id tren thanh dia chi
    }
    let result = await streamUpload(req);
    let du_lieu;
    if (result ==null){
        du_lieu = {
            description:req.body.description,
        }
    }else {
        du_lieu = {
            description:req.body.description,
            anh : result.url,
        }
    }
    console.log(du_lieu);


    //goi lenh update
    bannerModel.updateOne(dieu_kien,du_lieu,function (err,res){
        if (err)
        {
            console.log("Loi update"+err.message,{msg:'Lỗi update'})
        }
    })
    res.redirect('/banners/list')
}
exports.postDel=(req,res,next)=>{
    console.log(req.params);

    let dieu_kien ={
        _id : req.params.id // lay id tren thanh dia chi
    }

    //goi lenh update
    bannerModel.deleteOne(dieu_kien,function (err,res){
        if (err)
        {
            console.log("Loi del"+err.message,{msg:'Lỗi del'})
        }
    })
    res.redirect('/banners/list')
}