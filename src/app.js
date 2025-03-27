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
    res.status(400).send("error in registering user");
  }
})

 connectDB().then(()=>{
   console.log("database connection established");
   app.listen(3000 ,()=>{
      console.log("listening on port");
   });

}).catch(err =>{
  console.error("database connection error");
})


 //listening on a port
