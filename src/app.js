const express = require ("express");
//craeting an instance off express js application
 const app= express();
 app.get("/getuserdata",(req,res)=>{
//   logic of db call and get user data
try{
throw new Error("nononokn");
   res.send("user data is sent");
}
catch(err){
   res.status(404).send("user data is not");
}
 })
 app.use("/",(err,req,res,next)=>{
   if(err){
      res.status(500).send("smthg is wrong");
   }
 })

 


 //listening on a port
 app.listen(3000 ,()=>{
    console.log("listening on port");
 });