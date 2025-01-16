import nodemailer from 'nodemailer'
const sendMail =async(mail:string,subject:string,Html:string)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user:"iftakharalamshuvo11@gmail.com",
          pass: "qjxy shrp ejtw kqvr",
        },
      });

       await transporter.sendMail({
        from: '"Tour and Travels 👻" <iftakharalamshuvo11@gmail.com>', // sender address
        to: mail, // list of receivers
        subject: subject, // Subject line
        text: "Hello world?", // plain text body
        html:Html, // html body
      });

}

export default sendMail