const notiModel = require('../models/notification.model');
const path = require("path");

exports.getAllNoti = async (req,res,next) =>{
    const user = "all";
    const  itemList = await notiModel.find({userId: user});
    res.send(itemList)
}
exports.GetAllNotiByUser=async (req,res,next)=>{
    const user = req.user._id;
    if (user == null){
        return res.status(404).json({
            message:"Không tìm thấy user"
        });
    }

    let GetAllNotiByUser = await notiModel.find({userId: user}).sort({_id:-1});
    let GetAll = await notiModel.find({typenotificaton: "all"});

    const  abc = GetAll.map((item)=>{
        return item;
    })
    const  UserNoti = GetAllNotiByUser.map((item)=>{
        return item;
    })

    abc.forEach(items => UserNoti.push(items));

    res.status(200).json(UserNoti);

}