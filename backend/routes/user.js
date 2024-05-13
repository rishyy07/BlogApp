const express = require("express");
const router = express.Router();
const multer = require('multer');
const image = multer({dest :'images/'}); // destination dedi 



const {signup , login} = require("../controllers/Auth")
const {createPost , getCurUserAllPost , deletePost, getAllPost, updateIsAuth, verified} = require("../controllers/postController");


router.post("/login" , login);
router.post("/Signup" , signup);
router.post("/postBlog" ,image.single('image') , createPost); // eske andr image save ho rhi hai , kis name se aygi
router.get("/getCurUserAllPost/:id" , getCurUserAllPost);
router.delete("/deletePost/:id" , deletePost)
router.get("/getAllPost" , getAllPost);
router.put("/updateAuth/:id" , updateIsAuth);
router.get("/user/verify/:id" , verified);

module.exports = router;

