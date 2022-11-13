var FCM = require('fcm-node');
var serverKey = 'AAAA4oos57k:APA91bFyYJ2fZEP7jlGULUwC0NSc4VEFk86XTIx21ZX6f13LUbI1VyYGb0vS-7_ipjyi_-tOMMuk4PwtvveR_0fjixNC3ZcLEXbyGiQVoWO3VRX0xfUJknZ6Yico7YrhbBCA6oux6RTz';
var fcm = new FCM(serverKey);

const notiModel = require('../models/notification.model');

const {streamUpload} =require('../utils/UploadIMG');
const bannerModel = require("../models/banner.model");



exports.getNoti = async (req,res,next)=>{
    const  itemList = await notiModel.find();
    console.log(itemList)
    res.render('noti/list',{itemList:itemList});
}
exports.getAddNoti = async (req,res,next)=>{
    res.render('noti/noti');
}

exports.sendNoti = async (req,res,next) => {
    // let result = await streamUpload(req);
    // if (result ==null){
    //     return res.render('./notification',{msg:'Vui lòng thêm ảnh'});
    // }
    // let img_url = result.url;
    // console.log(img_url)
    let anhnoti ="";
    if (req.body.image==""){
        anhnoti = "https://res.cloudinary.com/kun-official/image/upload/v1668318647/8efc8c17e3bdf04d1b212d1c55f4564b_sbp8w2.png"
    }else {
        anhnoti = req.body.image
    }
    var message = {
        to:"/topics/all",
        // to: 'cdCunu14TDe4DTYohuxS7O:APA91bEoIvYHcmClPjLPJ5Kdt3bgcDBBM8R0ZmyC1mnn8uHWDiLAGCpHFiZByz5X8pMmkX1gvHg8lKF2CiAm1xwCuYA9gbgQJ5cw-fSFcEGM26zmOqrV87_rBj0pkqlSP6kB5mGdjtiz',
        collapse_key: 'your_collapse_key',

        notification: {
            title: req.body.title,
            body: req.body.body,
            image: anhnoti
        },

        data: {
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
    const d = new Date();
    let timenow = d.getHours()+":"+d.getMinutes();;

    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!", {msg: 'Lỗi gửi thông báo'});
        } else {
            console.log("Successfully sent with response: ", response, {msg: 'Gửi thông báo thành công'});
            const banner = new notiModel({
                title: req.body.title,
                body: req.body.body,
                image: anhnoti,
                time: timenow
            });
            banner.save((err)=>{
                if (err){
                    console.log("Loi add")
                } else {
                    console.log("add succes")
                }
            })
        }
    });
    res.redirect('/notification/add')
}
exports.getFormEditNoti = async (req,res,next)=>{
    let itemNoti = await notiModel.findById(req.params.id)
        .exec()
        .catch(function (err){
            console.log(err)
        });
    console.log(itemNoti);
    if (itemNoti==null){
        res.send('Không tìm thấy')
    }
    res.render('noti/edit',{itemNoti:itemNoti})
}
exports.postEditNoti = async (req,res,next) => {
    let anhnoti ="";
    if (req.body.image==""){
        anhnoti = "https://res.cloudinary.com/kun-official/image/upload/v1668318647/8efc8c17e3bdf04d1b212d1c55f4564b_sbp8w2.png"
    }else {
        anhnoti = req.body.image
    }
    const d = new Date();
    let timenow = d.getHours()+":"+d.getMinutes();;
    let dieu_kien ={
        _id : req.params.id // lay id tren thanh dia chi
    }
    let du_lieu = {
        title: req.body.title,
        body: req.body.body,
        image: anhnoti,
        time: timenow
    }
    notiModel.updateOne(dieu_kien,du_lieu,function (err,res){
        if (err)
        {
            console.log("Loi update"+err.message,{msg:'Lỗi update'})
        }
    })
    var message = {
        to:"/topics/all",
        // to: 'cdCunu14TDe4DTYohuxS7O:APA91bEoIvYHcmClPjLPJ5Kdt3bgcDBBM8R0ZmyC1mnn8uHWDiLAGCpHFiZByz5X8pMmkX1gvHg8lKF2CiAm1xwCuYA9gbgQJ5cw-fSFcEGM26zmOqrV87_rBj0pkqlSP6kB5mGdjtiz',
        collapse_key: 'your_collapse_key',

        notification: {
            title: req.body.title,
            body: req.body.body,
            image: anhnoti
        },

        data: {
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!", {msg: 'Lỗi gửi thông báo'});
        } else {
            console.log("Successfully sent with response: ", response, {msg: 'Gửi thông báo thành công'});
        }
    });
    res.redirect('/notification')
}
exports.postDel=(req,res,next)=>{
    console.log(req.params);

    let dieu_kien ={
        _id : req.params.id // lay id tren thanh dia chi
    }

    //goi lenh update
    notiModel.deleteOne(dieu_kien,function (err,res){
        if (err)
        {
            console.log("Loi del"+err.message,{msg:'Lỗi del'})
        }
    })
    res.redirect('/notification')
}