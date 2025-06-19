const express = require ("express");
const  validator= require("validator");
//craeting an instance off express js application
require("dotenv").config();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const app= express();
require("./utils/cronjob");
const { Error } = require("mongoose");


const allowedOrigins = [
  "http://localhost:5173",
  "https://devconnect-frontened.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    ("Origin Attempted:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use( cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("🚀 DevConnect backend is up and running!");
});

 
//   importing all the routes here
 const authRouter= require("./routes/auth");
 const profileRouter= require("./routes/profile");
 const requestRouter= require("./routes/request");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
 // usig these routes
 app.use("/",authRouter);
 app.use("/",profileRouter);
 app.use("/",requestRouter);
 app.use("/",userRouter);
 const initializeSocket = require("./utils/socket");

  app.use("/", chatRouter);
  
const server = http.createServer(app);
initializeSocket(server);

connectDB().then(()=>{
   console.log("database connection established");
   server.listen(process.env.PORT ,()=>{
      console.log("listening on port");
   });

}).catch(err =>{
  console.error("database connection error",err);
})


 //listening on a port
 //test deploy
