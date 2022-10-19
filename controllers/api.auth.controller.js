const UserModel = require('../models/user.model');
const bcrypt =require('bcrypt');


exports.postReg= async (req,res,next)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const userReg = new UserModel(req.body);

        userReg.password =await bcrypt.hash(req.body.password,salt);
        await userReg.save()

        const token =await userReg.generateAuthToken();

        res.status(200).json({userReg, token});
    }catch (e) {
        res.status(500).json(e);
    }
}
exports.postLogin= async(req,res,next)=>{
    try {
        const user = await UserModel.findByCredentials(req.body.email,req.body.password)
        if (!user){
            return res.status(401).send({error:"login failed! check auth credentials"})
        }
        const token = await user.generateAuthToken()
        res.status(200).send({user,token})
    } catch (error){
        console.log(error)
        res.status(400).send(error)
    }
}