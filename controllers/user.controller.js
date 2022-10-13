const UserModel = require('../models/model.User');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
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
    console.log(req.body);
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
     avatar:req.file.filename
 });
 newUser.save(function (err){
     if (err){
         console.log(err);
     }else {
         console.log('ghi du lieu thanh cong')
     }
 })

    res.redirect('/User/');
}