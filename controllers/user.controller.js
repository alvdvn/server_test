const UserModel = require('../models/user.model');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const fs = require('fs');
//hien thi danh sach User
exports.getListUSer=(req,res,next)=>{
    res.render('./User/list-User');
}
exports.getFormLogin = (req,res,next)=>{
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