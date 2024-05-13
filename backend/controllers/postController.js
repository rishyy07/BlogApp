const postBlog = require("../models/blog");
const User = require("../models/user");


// 
exports.createPost = async(req , res)=>{
    try{
        const {title ,  content , userId , user ,  isAuth} = req.body;
        // const p = req.files;
        // console.log(req.file);  hm path store kra lege , path se image get krlege
        const image = req.file.path;
        
        const post = new postBlog ({title , image , content , userId , user ,  isAuth});
        const savedPost = await post.save();
 
        //  update user blog id
        const updatedUser = await User.findByIdAndUpdate(userId , {$push:{blogs : savedPost}} , {new:true})
        .populate("blogs").exec();

        console.log(updatedUser);
        res.json({
            post:updatedUser , 
        })
        
    }
    catch(err){
       return res.status(400).json({
        error : "Error while creating post" ,
       })       
    }
}

exports.getCurUserAllPost = async(req , res) =>{
    try{
        const posts = await postBlog.find( {userId:req.params.id});
        res.status(200).json({
            success:true , 
            posts ,
            message : "Successfuly login"

        })
    }
    catch(err){
        return res.status(500).json({
            error : "error while creating comment",
        });
    }
}
exports.deletePost = async(req , res)=>{
    try {
        const postId = req.params.id;

        // Make sure to pass the ID as an object
        await postBlog.findByIdAndDelete({ _id: postId });

        return res.send("hogya");
    } catch (err) {
        return res.status(400).json({
            error: "error while deleting the post"
        });
    }
   
     
}



exports.getAllPost = async(req , res)=>{
    try{
        const posts = await postBlog.find({});
        return res.status(200).json({
            posts,
        })
    }catch (err) {
        return res.status(400).json({
            error: "error getting the post"
        });
    }
}

exports.updateIsAuth = async (req, res) => {
    try {
        const userIdToUpdate = req.params.id;
         const post = await postBlog.find({ _id: userIdToUpdate });
         
        const updatedPost = await postBlog.findOneAndUpdate(
            { _id: userIdToUpdate }, // find
            { $set: { isAuth: true } },
            { new: true } // To return the updated document
        );

        if (!updatedPost) {
            return res.status(404).json({
                error: "Post not found",
                post,
            });
        }

        return res.status(200).json({
            success: true,
            message: "isAuth updated successfully",
            updatedPost,
        });
    } catch (err) {
        console.error('Error updating isAuth:', err);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

exports.verified = async(req , res)=>{
    // 
    const userid = req.params.id;
    const existuser = await User.findOneAndUpdate(
        { _id: userid },
        { $set: { isAuth: true } },
        { new: true } // To return the updated document
    );

    if(existuser){
       res.send("found");
    }
    else{
        res.send("not fount");
    }
}




