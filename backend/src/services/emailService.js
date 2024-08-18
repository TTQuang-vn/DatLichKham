require('dotenv').config();
import nodemailer from 'nodemailer'

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    let info = await transporter.sendMail({
        from: '"Xac nhan 👻" <1924801030243@studen.tdmu.edu.vn>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Thông tin đặt lịch khám bệnh", // plain text body
        html: getBodyHTMLEmail(dataSend), // html body
    });
}
let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào ${dataSend.patientName}!</3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online tại phòng kham Anh Đức</p>
        <p>Thông tin đặt lịch khám bệnh: </p>
        <div>Thời gian: ${dataSend.time}</div>
        <div>Bác sĩ: ${dataSend.doctorName}</div>

        <p>Vui lòng click vào đường link bên dưới để xác nhận đặt lịch.</p>
        <div> <a href=${dataSend.redirectLink} targer="_blank" >Click here</a></div>
        <div>Xin chân thành cảm ơn</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Dear ${dataSend.patientName}!</3>
         <p>You are receiving this email because you have scheduled an online medical examination at Anh Duc clinic</p>
         <p>Information for scheduling medical examination: </p>
         <div>Time: ${dataSend.time}</div>
         <div>Doctor: ${dataSend.doctorName}</div>

         <p>Please click on the link below to confirm your appointment.</p>
         <div> <a href=${dataSend.redirectLink} target="_blank" >Click here</a></div>
         <div>Thank you very much</div>
        `
    }
    return result;
}
let sendAttachment = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    let info = await transporter.sendMail({
        from: '"Hoa don 👻" <1924801030243@studen.tdmu.edu.vn>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Kết quả khám bệnh", // plain text body
        html: getBodyHTMLEmailRemedy(dataSend), // html body
        attachments: [{
            filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
            content: dataSend.imageBase64.split("base64,")[1],
            encoding: 'base64',
        }],
    });
}
let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào ${dataSend.patientName}!</3>
        <p>Bạn nhận được email hóa đơn khám bệnh online tại phòng khám Anh Đức</p>
        <p>Thông tin hóa đơn khám bệnh: </p>
        <div>Xin chân thành cảm ơn</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Dear ${dataSend.patientName}!</3>
         <p>You receive an email for an invoice for online medical examination at Anh Duc clinic</p>
         <p>Medical invoice information: </p>

         <div>Thank you very much</div>
        `
    }
    return result;
}
module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment,
}