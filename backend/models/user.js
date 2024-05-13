const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type : String , 
        required : true , 
        trim : true , 
    } , 
    email : {
        type : String , 
        required : true , 
        trim : true , 
    } , 
    password : {
        type : String , 
        required : true , 
    } ,

    isAuth:{
        type:String , 
        default : false,
    } ,
     // changes:->
     blogs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref:"postBlog" ,
    }]

});

module.exports = mongoose.model("user" , userSchema);