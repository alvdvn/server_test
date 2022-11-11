
const CateModel =require('../models/category.model');
const fs = require('fs');
const {streamUpload} =require('../utils/UploadIMG');

exports.getListCate=async(req,res,next)=>{
    var listCate = await CateModel.find();
    res.render('./Category/list-Cate',{listCate:listCate});
}

exports.getFormAddCate=(req,res,next)=>{
res.render('./Category/add-Cate');
}

exports.postAddCate=async (req,res,next)=>{
    let result = await streamUpload(req);
    if (result ==null){
        return res.render('./cate/edit',{msg:'Chưa chọn ảnh '});
    }
    let filename= result.url;
    console.log(filename);

    const newCate = new CateModel({
        title:req.body.title,
        CateImg:filename
    });
    newCate.save(function (err){
        if (err){
            console.log(err);
        }else {
            console.log('ghi du lieu thanh cong')
        }
    })

    res.redirect('/cate/')
}

exports.getFormUpdateCate= async (req,res,next)=>{
    let CateData =await CateModel.findById(req.params.id).exec().
    catch(function (err) {
        console.log(err);
    });
    if (CateData ==null){
        res.send('Không tìm thấy bản ghi');
    }
    res.render('./Category/update-Cate',{CateData:CateData});
}

exports.postUpdateCate= async (req,res,next)=>{
    let condition1 ={
        _id : req.params.id // lay id tren thanh dia chi
    }
    let result = await streamUpload(req);
    if (result ==null){
        return res.render('./cate/edit',{msg:'Chưa chọn ảnh'});
    }
    let filename= result.url;

    let du_lieu = {
        title:req.body.title,
        CateImg:filename
    }

    //goi lenh update
    CateModel.updateOne(condition1,du_lieu,function (err,res){
        if (err)
        {
            console.log("Loi update"+err.message,{msg:'Lỗi update'})
        }
    })
    res.redirect('/cate/');
}
//xu li delete
exports.getFormDelete = async (req,res,next)=>{
    let dieu_kien ={
        _id : req.params.id // lay id tren thanh dia chi
    }
    //goi lenh update
    CateModel.deleteOne(dieu_kien,function (err,res){
        if (err)
        {
            console.log("Loi del"+err.message,{msg:'Lỗi del'})
        }
    })
    res.redirect('/cate/');
}