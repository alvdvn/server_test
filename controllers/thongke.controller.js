const OrderModel =require('../models/order.model');
const ProductModel =require('../models/product.model');
const moment = require('moment')
const {format2} = require('../utils/DateFormat');


exports.getFormAdd =async (req,res)=>{
    let Allincome =0;
    let AllPendingOrder =0;
    let AllConfirmedOrder =0;
    let AllDeliverOrder =0;
    let AllSuccessOrder =0;
    let AllOrder =0;
     //find all status
    const FindAllOrder= await OrderModel.find();
    if (FindAllOrder.length ==null){
        return res.status(404).json({message:"không tìm thấy bản ghi nào"});
    }
    for(let i =0;i<FindAllOrder.length;i++){
        Allincome += FindAllOrder[i].Total;
        AllOrder++
        if (FindAllOrder[i].status ==='Đang chờ xác nhận'){
            AllPendingOrder++
        }else if (FindAllOrder[i].status ==="Đang chuẩn bị hàng"){
            AllConfirmedOrder++
        }else if (FindAllOrder[i].status ==='Đang giao hàng'){
            AllDeliverOrder++
        }
        else if (FindAllOrder[i].status ==='Giao hàng thành công'){
            AllSuccessOrder++
        }
    }
    let formatIncome= format2(Allincome,' vnd');
    //find top 10 product sold
    let Top10Product =  await ProductModel.find().sort({"sold":-1}).limit(10)
   let objStatus = {
        AllOrder,
        AllPendingOrder,
        AllConfirmedOrder,
        AllDeliverOrder,
        AllSuccessOrder,
       formatIncome
    }
    let abc = "abc";
    let objTest={abc}
        res.render('./thongke/dash',{objStatus:objStatus,objTop10Product:Top10Product});
}
exports.getFilter = async (req,res)=>{
 //get start of the day
    const today = moment().startOf('day')
  const findOrderbyday = await OrderModel.find({
      createdAt:{
          $gte: today.toDate(),
          $lt:moment(today).endOf('day').toDate()
      }
  });
    if (findOrderbyday == null){
        return res.status(404).send({
            message:"Không tìm thấy bản ghi nào vào ngày hôm nay"
        });
    }else {

        let AmountByDay=0;
        await findOrderbyday.map(item => {
            return AmountByDay +=item.Total
        })
        res.status(200).json({
            AmountByDay
        });
    }
}

exports.getFilterWeek = async (req,res)=>{
    var now = moment();
    const hours = 0;
    const minutes = 0;
    var monday = now.clone().weekday(1).set("hour", hours).set("minute", minutes).toDate();
    var sunday = now.clone().weekday(7).set("hour", hours).set("minute", minutes).toDate();
    console.log(monday)
    console.log(sunday)
    let weeks = await OrderModel.aggregate([
        {$match: {createdAt:{$gt: monday, $lt: sunday}}},
        {
            $group: {
                _id: {
                    day: { $dateTrunc: { date: "$createdAt", unit: "day" } }
                },
                total: {$sum:"$Total"}
            }
        },
        {
            $group:{
                _id: "$_id.day",
                count: { $push: { total: "$total" } }
            }
        },
        {$sort:{_id:1}}
    ]);
    console.log(weeks);
    res.json({dayofweek:weeks});
}

exports.getDaysinmonht = async (req,res)=>{
const momentDay =moment().startOf('day').subtract(30, 'day').toDate();
    console.log(momentDay)
    let days = await OrderModel.aggregate([
        { $match: { createdAt: { $gt: momentDay } } },

        {
            $group: {
                _id: {
                    day: { $dateTrunc: { date: "$createdAt", unit: "day" } }
                },
                total: {$sum:"$Total"}
            }
        },

        {
            $group: {
                _id: "$_id.day",
                count: { $push: { total: "$total" } }
            },

        }
        ,{$sort:{_id:1}}
    ])

res.json({DaysOfMonth: days});
}
//test year
exports.getMonthsInYear = async (req,res)=>{
    // const momentDay =moment().startOf('day').subtract(30, 'day').toDate();
    const startOfMonth = moment().startOf('year').toDate();
    const lastDayOfYear = moment().endOf('year').toDate()
    console.log(startOfMonth)
    console.log(lastDayOfYear)
    let days = await OrderModel.aggregate([
        { $match: { createdAt: { $gt: startOfMonth,$lt:lastDayOfYear } } },
        {
            $group: {
                _id: {
                    month: { $month: {date:"$createdAt"} },
                    year:{$year:{date:"$createdAt"}}
                },
                total: {$sum:"$Total"}
            }
        },
        {
            $group: {
                _id: "$_id",
                count: { $push: { total: "$total" } }
            }
        },
        {$sort:{_id:1}}
    ])

    res.json({MonthOfYear: days});
}

exports.getFilterMonthtoYear =(req,res)=>{
    var months = ["jan", "feb", "mar", "apr", "may", "jun", "july", "aug", "sep", "oct", "nov", "dec"];

    var date = new Date();
    var month = date.getMonth(); // returns 0 - 11

    var year = date.getFullYear();

    console.log(months[month]);

    console.log(year);
}





exports.getfilterIncome =async (req,res)=>{
    let Allincome =0;
    try {
        const getAllOrder = await OrderModel.find();
        console.log(getAllOrder);
        if (getAllOrder.length ==null){
            return res.status.json({message:"không tìm thấy bản ghi nào"});
        }
            for (let i=0;i<getAllOrder.length;i++){
                Allincome += getAllOrder[i].Total;
            }

        res.status(200).json({
            Income:Allincome
        });
    }catch (err){
        return res.status(500).json({
            message:err.message
        })
    }
}