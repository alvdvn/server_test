const  UserModel =require('../models/user.model');
const bcrypt = require('bcrypt');
exports.getFormLogin = (req,res,next)=>{
    res.render('./User/login');
}
exports.postLogin = async (req,res,next)=>{
const body =req.body;
const user = await  UserModel.findOne({
    email: body.email
});
 if(!user){
       return res.render('./User/login',{msg:'Sai mật khẩu Hoặc email'});
    }
if (user.role === "User"){
    res.render('./User/login',{msg:'không đủ quyền để đăng nhập '});
}else {
    if (user){
        const validatePass = await  bcrypt.compare(body.password,user.password);
        if (validatePass){
            //login ok
            console.log(req.session)
            req.session.user = user
            res.redirect('/pro/list')
        }else {
            res.render('./User/login',{msg:'Sai mật khẩu Hoặc email'});
        }
    }
}
}
exports.postResetPassword=(req,res)=>{
    const {token}= req.params;

    res.render('./User/reset-password');
}
