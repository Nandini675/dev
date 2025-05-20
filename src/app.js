const express = require ("express");
//craeting an instance off express js application
require("dotenv").config();
const connectDB = require("./config/database");

 const app= express();
 const User = require("./models/user");
app.use(express.json());
 app.post("/signup", async (req,res) => {

  console.log(req.body);
  //creating a nwe instance of the user model
  const user = new User(req.body);
  try{
   await user.save();
   res.send("User registered successfully");
  }
  catch(err){
    res.status(400).send(err.message);
  }
})

//get user by email
app.get("/user", async (req,res)=>{
  const useremail= req.body.emailId;
    try 
    {
      
      const user= await User.find({emailId:useremail});
     if(user.length==0){
      res.status(404).send("user not found");
     }
     else{
      res.send(user);}}
    catch(err){
      res.status(400).send("error in getting user");
    }
})
//Feed api-get/feed: get all the user from the db


app.get("/feed", async (req,res)=>{

  try{
    const user=  await User.find({});
    res.send(user);
  }
  catch(err){
    res.status(400).send("error in getting user");
  }
})
// dleet a ser from the db
 app.delete("/user",async(req,res)=>{
const userid= await req.body.userId;
try{
  const user= await User.findByIdAndDelete({ _id:userid},);
  if(!user){
    res.status(404).send("User not found");
  }
  else{
    res.send("userdelete success");
  }
}
catch(err){
  res.status(500).send("server error");

 }})
// update  the data of user
app.patch("/user/:userId",async(req,res)=>{
  const userid= req.params?.userId;
  const data = req.body;
 
  
  try{
    const Allowed_UPDATES=["age","about","location","photoUrl","experienceLevel","lookingFor", "skills"]
  const isupdateallowed= Object.keys(data).every((k)=>
    Allowed_UPDATES.includes(k)
);
 if(!isupdateallowed)
 {throw new Error("update not allowed")}
  if(data?.skills.length>10){
    throw new Error("skills can't be more than 10");
  }
     const user =await User.findByIdAndUpdate({_id:userid},data,{
      returnDocument:"after",
      runValidators:true,
    });
    console.log(user);
    res.send( "user updated succesfully");
  }
  catch(err){
    res.status(500).send("UPDATE FAILED"+err.message);
  }
}),
connectDB().then(()=>{
   console.log("database connection established");
   app.listen(3000 ,()=>{
      console.log("listening on port");
   });

}).catch(err =>{
  console.error("database connection error");
})


 //listening on a port
