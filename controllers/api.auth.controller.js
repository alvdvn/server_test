const UserModel = require('../models/user.model');
const IMGModel = require('../models/Img.model');
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const {restPassword} =require('../utils/emailTemplates');
const {sendEmail} =require('../utils/sendEmail');
const {streamUploadAPI, streamUpload} =require('../utils/UploadIMG');

exports.postReg= async (req,res)=>{
    let result;
    let filename
    if (req.file){
        result = await streamUploadAPI(req);
        filename=result.url
    }else {
      const Avatar = await IMGModel.findById({_id:"6366274f29d343cc922c5946"});
      result = Avatar.IMG;
        filename=result;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const userReg = new UserModel(req.body);
        userReg.password =await bcrypt.hash(req.body.password,salt);
        userReg.avatar =await filename;
        await userReg.save()
        const token =await userReg.generateAuthToken();

        res.status(201).send({userReg, token});
    }catch (e) {
        res.status(500).send(e);
    }
}
exports.postLogin = async (req,res,next)=>{

    try {

        const user = await UserModel.findByCredentials(req.body.email, req.body.password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()

        res.status(200).send({ user, token })

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }


}
exports.getProfile = (req,res,next)=>{
    res.send(req.user);
}
exports.getAdminProfile = async (req,res)=>{
    try {
const AdminProfile = await UserModel.findOne({_id:'6366092dbbde5551a82a28aa'});
        console.log(AdminProfile);
        if (AdminProfile ==null){
          return res.status(404).json({message:"Không tìm thấy"});
        }
        res.status(200).json(AdminProfile);
    }catch (error){
        return res.status(500).json({
            message:"Có lỗi xảy ra"
        })
    }
}
exports.postLogout = async  (req,res,next)=>{

    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        // res.send("Logout thanh cong")
        console.log("logout thanh cong")
        return res.json({ success: true });
    } catch (error) {
        res.status(500).send(error)
    }

}
// logout khỏi toàn bộ các thiết bị
exports.postLogoutAll = async (req,res,next)=>{
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}
exports.putChangePassword =async (req,res)=>{
    const {oldPassword, newPassword} = req.body;
    const userID = req.user._id;
    console.log(userID)
    const UserChangePass =await UserModel.findById(userID);
    if(UserChangePass){
        bcrypt.compare(oldPassword, UserChangePass.password, (err, isMatch) => {
            if(err){
                return res.status(500).json({
                    status: false,
                    message: "Server error",
                    error: err
                })
            }else if(isMatch){
                bcrypt.hash(newPassword, 10, async (err ,hash) => {
                    if(err){
                        return res.status(500).json({
                            status: false,
                            message: "Error, cannot encrypt password",
                            error: err
                        })
                    }
                    UserChangePass.password = hash;
                    UserChangePass.save().then(updatedUser => {
                        return res.status(200).json({
                            status: true,
                            message: "Password has been changed successfully",
                            data: updatedUser
                        })
                    })
                })
            }else{
                return res.status(401).json({
                    status: true,
                    message: "Old password incorrect",
                    data: undefined
                })
            }
        })
    }
}
exports.postForgotPassword= async (req,res)=>{
try {
    const {email}= req.body;
    const user=await UserModel.findOne({email});
    if (!user){
        return res.status(400).json({
            status: false,
            message: "Error or email does not exist",
            data: undefined
        })
    }
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SEC_KEY,{expiresIn:'5m'});
    const emailTemplate =restPassword(user.email,token);
    sendEmail(emailTemplate)
    res.status(200).json({
        status:true,
        message:"Mail have been sent"
    })
}catch (e){
    res.status(401).json({
        status:false,
        message:e
    })
}
}
exports.putResetPassword =async (req,res)=>{
    const token =req.params.token;
    const {newPassword}=req.body;
    try {
        const data = jwt.verify(token, process.env.TOKEN_SEC_KEY);
        const user =await UserModel.findOne({_id:data._id,});
                bcrypt.hash(newPassword,10,(err,hash)=>{
                    if (err){
                        return res.status(402).json({
                            status:false,
                            message:err
                        });
                    }
                    user.password=hash;
                    user.save().
                        then(async (result)=>{
                            res.status(200).json({
                                status:true,
                                message:"Password reset successfully"
                            })
                    })
                })
    }catch (e) {
        return res.status(401).json({
            status:false,
            message:e,
        })
    }
}
//update profile
exports.putEdit = async (req,res,next)=>{
    const user = req.user
    // console.log(user)
    let dieu_kien ={
        _id : user._id // id user
    }
    console.log(dieu_kien)
    let du_lieu;
    if (req.file!=null){
        let result = await streamUpload(req);
        let filename = result.url;
         du_lieu = {
            email:req.body.email,
            full_name:req.body.full_name,
            address:req.body.address,
            phone_number:req.body.phone_number,
            avatar:filename
        }
    }else {
         du_lieu = {
            email:req.body.email,
            full_name:req.body.full_name,
            address:req.body.address,
            phone_number:req.body.phone_number,
            // avatar:filename
        }
    }

    UserModel.updateOne(dieu_kien,du_lieu,function (err,res){
        if (err)
        {
            console.log("Loi update"+err.message,{msg:'Lỗi update'})
        }else {
            console.log("update oke")
        }
    })
    return res.json({ success: true });
}
//update sdt
exports.putEditPhone = async (req,res,next)=>{
    const user = req.user
    let dieu_kien ={
        _id : user._id // id user
    }
    console.log(dieu_kien)
    let du_lieu = {
        phone_number:req.body.phone_number,
    }
    console.log(du_lieu)
    //goi lenh update
    UserModel.updateOne(dieu_kien,du_lieu,function (err,res){
        if (err)
        {
            console.log("Loi update"+err.message,{msg:'Lỗi update'})
        }else {
            console.log("update oke")
        }
    })
    return res.json({ success: true });
}
//update adress
exports.putChangeAddress = async (req,res,next)=>{
   const user = req.user._id;
   const {address}=req.body;
   const addressUpdate = await UserModel.updateOne(
       {_id:user},
       {$set:{address:address}}
   );
   res.status(200).json({
       status:true,
       message:"Update địa chỉ thành công"
   })
}


