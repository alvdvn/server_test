
const CateModel =require('../models/category.model');
const fs = require('fs');

exports.getListCate=async(req,res,next)=>{
    var listCate = await CateModel.find();
    res.render('./Category/list-Cate',{listCate:listCate});
}

exports.getFormAddCate=(req,res,next)=>{
res.render('./Category/add-Cate');
}

exports.postAddCate=(req,res,next)=>{
    try {
        fs.rename(req.file.destination + req.file.filename,
            './public/uploads/' + req.file.originalname,
            function (err){
                if(err){
                    console.log(err)
                }
            }
        )
    }catch (err){
        return res.render('./cate/add',{msg:"Vui lòng thêm ảnh"})
    }
    const filename = 'http://localhost:3000/uploads/'+req.file.originalname;

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

exports.postUpdateCate=(req,res,next)=>{
    let condition1 ={
        _id : req.params.id // lay id tren thanh dia chi
    }
    try {
        fs.rename(req.file.CateImg + req.file.filename,
            './public/uploads/' + req.file.originalname,
            function (err){
                if(err){
                    console.log(err)
                }
            }
        )
    }catch (err){
        return res.render('./Category/update-Cate',{msg:"Vui lòng thêm ảnh"})
    }
    const filename = 'http://localhost:3000/uploads/'+req.file.originalname;

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