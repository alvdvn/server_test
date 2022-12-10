let restPassword = (email,token)=>{
    const mailOptions ={
        from:'nhom12ungdungquanao@gmail.com',
        to:email,
        subject:'Khôi phục mật khẩu cho '+ email,
        text:'truy cập link để đổi mật khẩu :'+'https://mofshop.shop/reset-password/'+token
    };
    return mailOptions;
}
module.exports = { restPassword };