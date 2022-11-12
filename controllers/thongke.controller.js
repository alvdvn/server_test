const OrderModel =require('../models/order.model');
const moment = require('moment')

exports.getFormAdd = (req,res)=>{
    res.render('./thongke/dash');
}
exports.getFilter = async (req,res)=>{
 //get start of the day
    const today = moment().startOf('day')
  const findOrderbyday = await OrderModel.find({
      CreatedAt:{
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