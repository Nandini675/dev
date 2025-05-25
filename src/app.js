const express = require ("express");
const  validator= require("validator");
//craeting an instance off express js application
require("dotenv").config();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app= express();
const { Error } = require("mongoose");
app.use(express.json());
app.use(cookieParser());
 
//   importing all the routes here
 const authRouter= require("./routes/auth");
 const profileRouter= require("./routes/profile");
 const requestRouter= require("./routes/request");
 // usig these routes
 app.use("/",authRouter);
 app.use("/",profileRouter);
 app.use("/",requestRouter);
  

connectDB().then(()=>{
   console.log("database connection established");
   app.listen(3000 ,()=>{
      console.log("listening on port");
   });

}).catch(err =>{
  console.error("database connection error");
})


 //listening on a port
