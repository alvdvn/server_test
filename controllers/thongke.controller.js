const OrderModel =require('../models/order.model');
const moment = require('moment')

exports.getFormAdd = (req,res)=>{
    res.render('./thongke/dash');
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

exports.getFilterMonth = async (req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));

    try {
        const income =await OrderModel.aggregate([
            {$match:{createdAt:{$gte:previousMonth}}},
            {
                $project:{
                    month: { $month: "$createdAt" },
                    sales:"$Total",
                },
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:"$sales"},
                },
            },
        ]);
        console.log(income);
        res.status(200).json(income);
    }catch (err){
        return res.status(500).json({message:err.message})
    }
}

exports.getFilterMonthtoYear =(req,res)=>{
    var months = ["jan", "feb", "mar", "apr", "may", "jun", "july", "aug", "sep", "oct", "nov", "dec"];

    var date = new Date();
    var month = date.getMonth(); // returns 0 - 11

    var year = date.getFullYear();

    console.log(months[month]);

    console.log(year);
}

exports.getfilterStatusOrder =async (req,res)=>{
    let AllPendingOrder =0;
    let AllConfirmedOrder =0;
    let AllDeliverOrder =0;
    let AllSuccessOrder =0;
    let AllOrder =0;
    const FindAllOrder= await OrderModel.find();
    if (FindAllOrder.length ==null){
        return res.status(404).json({message:"không tìm thấy bản ghi nào"});
    }else {
        for(let i =0;i<FindAllOrder.length;i++){
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
        res.status(200).json({
            AllOrder:AllOrder,
            pending:AllPendingOrder,
            Confirmed:AllConfirmedOrder,
            Deliver:AllDeliverOrder,
            Success:AllSuccessOrder
        });
    }

}

exports.getfilterIncome =async (req,res)=>{
    let Allincome =0;
    try {
        const getAllOrder = await OrderModel.find();

        if (getAllOrder.length ==null){
            return res.status.json({message:"không tìm thấy bản ghi nào"});
        }else {
            for (let i=0;i<getAllOrder.length;i++){
                Allincome += getAllOrder[i].Total;
            }
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