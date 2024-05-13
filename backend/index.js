const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded());
const cookieParse  = require("cookie-parser")
app.use(cookieParse());
app.use("/images" , express.static('images'));

const PORT = process.env.PORT || 4000;
const cors = require('cors');

app.use(cors());
// import user from routes

const user = require("./routes/user.js")
app.use("" , user);

// connecting with db
const db = require("./config/database.js");
db.connect();


app.listen(PORT , ()=>{
    console.log(`Server is running at ${PORT}`)
})

