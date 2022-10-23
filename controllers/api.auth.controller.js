const UserModel = require('../models/user.model');
const bcrypt =require('bcrypt');


exports.postReg= async (req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const userReg = new UserModel(req.body);

        userReg.password =await bcrypt.hash(req.body.password,salt);

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
exports.postLogout = async  (req,res,next)=>{

    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
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

