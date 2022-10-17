const UserModel = require('../models/user.model');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const {raw} = require("body-parser");
const bannerModel = require("../models/banner.model");
//hien thi danh sach User
exports.getListUSer=async(req,res,next)=>{
    var listUser = await UserModel.find();
    res.render('./User/list-User',{listUser:listUser});
}
exports.getFormLogin =  (req,res,next)=>{
    res.render('./User/login');
}
//hien thi form add
exports.GetFormAddUser=(req,res,next)=>{
    res.render('./User/add-User');
}
//xu li them vao csdl
exports.postAddUser= (req,res,next)=>{
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
        return res.render('./users/add',{msg:"Vui lòng thêm ảnh"})
    }
    const filename = 'http://localhost:3000/uploads/'+req.file.originalname;

 const newUser = new UserModel({
     email:req.body.user_email,
     password:CryptoJS.AES.encrypt(
         req.body.user_password,
         process.env.PASS_SEC
     ).toString(),
     full_name:req.body.user_full_name,
     address:req.body.user_address,
     phone_number:Number(req.body.user_phone_number),
     role:req.body.role,
     avatar:filename
 });
 newUser.save(function (err){
     if (err){
         console.log(err);
     }else {
         console.log('ghi du lieu thanh cong')
     }
 })

    res.redirect('/users/add')
}
//xu li lay form edit
exports.getFormEditUser=async (req,res,next)=>{
    let UserData =await UserModel.findById(req.params.id).exec().
        catch(function (err) {
        console.log(err);
    });
    if (UserData ==null){
        res.send('Không tìm thấy bản ghi');
    }
    res.render('./User/update-User',{UserData:UserData});
}
exports.getPostEditUser=(req,res,next)=>{
    console.log(req.file)
    console.log(req.params);
    let condition ={
        _id : req.params.id // lay id tren thanh dia chi
    }
    try {
        fs.rename(req.file.avatar + req.file.filename,
            './public/uploads/' + req.file.originalname,
            function (err){
                if(err){
                    console.log(err)
                }
            }
        )
    }catch (err){
        return res.render('./User/update-User',{msg:"Vui lòng thêm ảnh"})
    }
    const filename = 'http://localhost:3000/uploads/'+req.file.originalname;

    let du_lieu = {
        email:req.body.user_email,
        password:CryptoJS.AES.encrypt(
            req.body.user_password,
            process.env.PASS_SEC
        ).toString(),
        full_name:req.body.user_full_name,
        address:req.body.user_address,
        phone_number:Number(req.body.user_phone_number),
        role:req.body.role,
        avatar:filename
    }

    //goi lenh update
    UserModel.updateOne(condition,du_lieu,function (err,res){
        if (err)
        {
            console.log("Loi update"+err.message,{msg:'Lỗi update'})
        }
    })
    res.redirect('/users/add');
}
//xu li delete
exports.getFormDelete = async (req,res,next)=>{
    let dieu_kien ={
        _id : req.params.id // lay id tren thanh dia chi
    }
    //goi lenh update
    UserModel.deleteOne(dieu_kien,function (err,res){
        if (err)
        {
            console.log("Loi del"+err.message,{msg:'Lỗi del'})
        }
    })
    res.redirect('/users/');
}

