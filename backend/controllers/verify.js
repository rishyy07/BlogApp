const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, subject, text) => {
  try {
    console.log(text);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host:"smtp.gmail.com" ,
      secure:false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }, 
      // authMethod: "PLAIN"
    });
    console.log("checking " + email);
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    } 
   
      try{ // smtp simple mail tranform protocol 
        await transporter.sendMail(mailOptions);
      } catch(err){
         console.log("problem + " +  err);
      }
    



    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email not sent");
    console.error(error);
  }
};

module.exports = sendEmail;
