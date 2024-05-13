const mongoose = require("mongoose");

const postBlog = new mongoose.Schema({
    // title
    title:{
        type:String , 
        required : true , 
    } , 
    image:{
        type : String , 
    } ,
    content:{
        type : String , 
        required : true , 
    } , 
    userId : {
        type : String , 
        required : true , 
    } ,
    user:{ // user ka naam jisne kiya hai
      type:String , 
    },
    isAuth:{
        type:String , 
        default:false ,
    }

   
});

module.exports = mongoose.model("postBlog" , postBlog);