const express = require ("express");
//craeting an instance off express js application
 const app= express();
 const {adminAuth} = require("./middleware/auth");
// handle auth  middleware for all req GET,POST..
app.use("/admin",adminAuth);
 
app.get("/admin/getalldata",(req,res)=>{
   //logic of cheking if the user is autherized 
   res.send("all data is sent");
})
app.get("/admin/deleteuser",(req,res)=>{
    //logic of cheking if the user is autherized
   res.send("user is deleted");
})
 //listening on a port
 app.listen(3000 ,()=>{
    console.log("listening on port");
 });