let restPassword = (email,token)=>{
    const mailOptions ={
        from:'nhom12ungdungquanao@gmail.com',
        to:email,
        subject:'Password reset for '+ email,
        text:'Password reset link:'+'http://localhost:3000/api/auth/reset-password/'+token
    };
    return mailOptions;
}
module.exports = { restPassword };