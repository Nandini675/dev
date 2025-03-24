const express = require ("express");
//craeting an instance off express js application
 const app= express();
// this will only handle get call to /user
//  app.get("/user/:userid",(req,res)=>{
//   console.log(req.params);
//   res.send({firstName:"nandini",lastName:"sharma"})
//  })
//   // post call
//   app.post("/user",(req,res)=>{
//     console.log("save data to db");
//     res.send("data successfully saved to db");
//  });
//  //delete call
//  app.delete("/user",(req,res)=>{
//   res.send("delete call ho gyi");
//  });
//  // this will match to all the http method API calls to /test
//    app.use("/hello",(req,res)=>{
//     res.send("hello from server");
//    });
 
app.use("/user",(req,res,next)=>{
  //routin handler
  
  console.log("handling the route server 1!");
 next();
 res.send("response!!");
     },
     (req,res)=>{
      console.log("handling the route user 2!!");
      res.send("2nd response");
     },
     (req,res)=>{
      console.log("handling the route user 3!!");
      res.send("3rd response");
     }

    );
 //listening on a port
 app.listen(3000 ,()=>{
    console.log("listening on port");
 });