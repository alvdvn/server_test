const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    service:'gmail',
    auth:{
        user:'nhom12ungdungquanao@gmail.com',
        pass:'qlwhcmkjmwwllsxq'
    }
});
let sendEmail = (emailTemplate) => {
    transporter.sendMail(emailTemplate, (err, info) => {
        if(err) {
            console.log(err)
        }else{
            console.log('Email sent: ', info.response)
        }
    })
}
module.exports = {sendEmail};