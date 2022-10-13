const  UserModel = require('../models/User');
const  bcrypt = require('bcrypt');



exports.getFormLogin = (req,res,next)=>{
    res.render('./users/login');
}
exports.postLogin =  async (req,res,next)=>{
    console.log(req.body);
    const body = req.body;
    const  User  = await  UserModel.findOne({
       email:body.email
    });
   // if(User.)
}
exports.getFormRegister =(req,res,next) =>{
    res.render('../user/regster');
}
exports.getFormAddUser =(req,res,next) =>{
    res.render('../user/regster');
}
exports.getFormEditUser =(req,res,next) =>{
    res.render('../user/regster');
}
exports.postAdd =(req,res,next) =>{

    res.redirect('./users')
}
exports.postEdit =(req,res,next) =>{

    res.redirect('./users')
}
exports.postDel =(req,res,next) =>{
    res.render('../user/regster');
    res.redirect('./users')
}
//get User
exports.getUser =(req,res ,next )=>{
    res.render('')
}
