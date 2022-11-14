const AddressModel =require('../models/address.model');

exports.postAddAddress = async (req,res)=>{
    //lấy thông tin nhaanpj liệu từ khách hàng
    const {Name,DetailAddress,NumberPhone}=req.body;
    //lấy UserId từ token
    const userId = req.user._id;
    //query xem trong model đã có address hay chưa
    let Findaddress = await AddressModel.findOne({userId});
    // nếu mà đã có địa chỉ
    if (Findaddress){
        //nếu mà trong array của address không có gì thì tiến hành thêm data

            Findaddress.address.push({
                Name,
                DetailAddress,
                NumberPhone:NumberPhone
            });
            Findaddress = await Findaddress.save();
            return res.status(201).send(Findaddress);

    }else {
        //nếu chưa có thì truy vấn tạo mới
        const newAddress = await AddressModel.create({
            userId,
            address:[{
                Name,
                DetailAddress,
               NumberPhone:NumberPhone
            }]
        });
        return res.status(201).json(newAddress);
    }

}

exports.getAllAddress = async(req,res)=>{
    const user = req.user._id;
    if (user ==null){
        return res.status(404).json({
            message:"không tìm thấy người dùng"
        });
    }else {
        let FindAddress = await AddressModel.findOne({userId:user});
        if (FindAddress == null){
            return res.status(404).json({
                message:"không tìm thầy dữ liệu"
            });
        }else {
            res.status(200).json(FindAddress);
        }
    }

}
exports.deleteShippingAddress=async (req,res)=>{
    const user = req.user;
    const  itemId = req.params.itemId;
    if (user){
        const DeleteItem = await AddressModel.findOneAndUpdate(
            { userId:user._id },
        {
            $pull: { address: { _id: itemId} },
        },
        { new: true }
        );
        DeleteItem.save();
        res.status(200).json({
            message:"Xóa thành công"
        })
    }else {
        return res.status(404).json({
            message:"Không tìm thấy thông tin người dùng"
        })
    }

}