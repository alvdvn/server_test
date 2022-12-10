let restPassword = (email,id,token)=>{
    const mailOptions ={
        from:'nhom12ungdungquanao@gmail.com',
        to:email,
        subject:'Password reset for '+ email,
        text:'Password reset link:'+'https://mofshop.shop/reset-password/'+token
    };
    return mailOptions;
}
module.exports = { restPassword };