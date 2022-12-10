const  UserModel =require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {layouts} = require("chart.js");
exports.getFormLogin = (req,res)=>{
    res.render('./User/login');
}
exports.postLogin = async (req,res)=>{
const body =req.body;
const user = await  UserModel.findOne({
    email: body.email
});
 if(!user){
       return res.render('./User/login',{msg:'Sai mật khẩu Hoặc email'});
    }
if (user.role === "User"){
    res.render('./User/login',{msg:'Không đủ quyền để đăng nhập'});
}else {
    if (user){
        const validatePass = await  bcrypt.compare(body.password,user.password);
        if (validatePass){
            //login ok
            console.log(req.session.user)
            req.session.user = user
            res.redirect('/pro/list')
        }else {
            res.render('./User/login',{msg:'Sai mật khẩu Hoặc email'});
        }
    }
}
}
exports.getProfileUser=(req,res)=>{

    res.render('account',{users:req.session.user});
}
exports.GetResetPassword=async (req,res)=>{
    const token =req.params.token;
    return jwt.verify(token, process.env.TOKEN_SEC_KEY, (err, result) =>
    {
        if (err){
        console.log("Auth error", err);
            return res.render('./User/login',{msg:"link đã hết hạn"})
        }
        console.log(result)
        res.render('./User/reset-password');
    });
}
exports.postResetPassword=async(req,res)=>{
    const token =req.params.token;
    const {newPassword,ConfirmPassword}=req.body;
    try {
        const data = jwt.verify(token, process.env.TOKEN_SEC_KEY);
        console.log(data)
        const user =await UserModel.findOne({_id:data._id,});
        if (newPassword != ConfirmPassword){
           return res.render('./User/reset-password',{msg:"Nhập lại mật khẩu không trùng khớp"})
        }else {
            bcrypt.hash(newPassword,10,(err,hash)=>{
                if (err){
                    res.render('./User/reset-password',{msg:"Đã Có lỗi xảy ra"})
                }
                user.password=hash;
                user.save();
            })
           await UserModel.findOneAndUpdate(
                { _id:data._id },
                {
                    $pull: { tokens: { token: token} },
                },
                { new: true }
            );
            res.render('./User/reset-password',{msg:"Thành công"})
        }

    }catch (e) {
         res.render('./User/reset-password',{msg:"Có lỗi xảy ra"});
        console.log(e)
    }

    res.render('./User/reset-password');
}
exports.getLogOut=(req,res)=>{
    req.session.destroy();
    res.redirect('/');
}
