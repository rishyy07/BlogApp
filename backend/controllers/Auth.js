const bcrypt = require("bcrypt");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const sendEmail = require("./verify.js");
// sign up
exports.signup = async(req , res)=>{
    try{
        // get data 
        const {name , email , password} = req.body;
        console.log("just checking " + req.body);
        // check if user already exist or not
        const existUser = await User.findOne({email});

        if(existUser){
            return res.status(400).json({
                success:false , 
                message:"User Already Exists" ,
            })
        }

        // secure password
        try{
          let hashPassword = await bcrypt.hash(password , 10);
          // store in data base 
          console.log(hashPassword);

          let user = new User({
            name ,  email , password:hashPassword
          })
          await user.save();

          const message = `${process.env.BASE_URL}/user/verify/${user._id}`;
          console.log("message " + `${process.env.BASE_URL}/user/verify/${user._id}` )
          console.log(user.email);
          await sendEmail(user.email, "Verify Email", message);

          return res.status(200).json({
            success : true , 
            message : "User Created Successfully" , 
            data : user
          })

        }catch(err) {
            console.error(err)
            return res.status(500).json({
                success: false,
                message: "Error in hasing password",
            })
        }
    }catch(err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "User cannot be register,Please try again later",
        })
    }
}


// log in

exports.login = async(req , res)=>{
    try{
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message : "Please fill all the details carefully",
            })
         }
  
         // check for register user
         let user = await User.findOne({email});
         console.log(user);

         if(!user){
            return res.status(401).json({
                success : false,
                message : "User does not exist",
            });
         }

         // now check the password
         let flag = await bcrypt.compare(password , user.password );
      
         if(flag){
            console.log(typeof user);
            // res.cookie("token","bhjghj");
            // console.log(cookie());
            return res.status(200).json({
                success:true , 
                token:JSON.stringify(user),
                message : "Successfuly login"

            })
         }
         else{
            return res.status(403).json({
                success:false , 
                message : "password Incorrect" ,
            })
         }
        
    }
    //
    catch(err){
        return res.status(500).json({
            success:false , 
            message:"login failure",
        })
    }
}