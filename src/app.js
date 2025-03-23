const express = require ("express");
//craeting an instance off express js application
 const app= express();
   app.use("/test",(req,res)=>{
    res.send("test from server");
   });
 
   app.use("/hello",(req,res)=>{
    res.send("hello from server");
   });
 
 
 //listening on a port
 app.listen(3000 ,()=>{
    console.log("listening on port");
 });