const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/BlogDatabase")
    .then(()=>{console.log("successfully connected")})
    .catch((err)=>{
        console.log("issue with connecting db");
        process.exit(1);
    })
}