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

    let GetAllNotiByUser = await notiModel.find({userId: user});
    let GetAll = await notiModel.find({typenotificaton: "all"});

    const  abc = GetAll.map((item)=>{
        return item;
    })

    GetAllNotiByUser.forEach(element => abc.push(element));

    // abc.push(GetAll);
    // const abc = GetAll.concat(GetAllNotiByUser).reduce((ac,a) => {
    //     let key = Object.keys("a");
    //     ac[key] = ac[key] || [];
    //     ac[key].push(a)
    //     return ac;
    // },{})
    // console.log(abc)
    res.status(200).json(abc);

}