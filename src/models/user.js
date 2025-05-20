const mongoose = require("mongoose");
const validator= require("validator")
const userSchema =  new mongoose.Schema({
  firstName:{
    type: String,
    required:true,
    trim: true,
    minlength: 2,
   maxlength: 50,
   match: /^[A-Za-z]+$/   // Only alphabets
  },  
  lastName:{
    type:  String,
    required:true,
    trim: true,
minlength: 2,
maxlength: 50,
match: /^[A-Za-z]+$/   // Only alphabets
  },
  emailId:{
    type:String,
    lowercase:true,
    required:true,
    unique: true,
    trim:true,
    validate (value){
      if (!validator.isEmail(value)) {
        throw new Error("invalid email address"+ value);
    }

    }

  },
   password:{
    type:String,
    required:true,
    minilength:8,
      validate (value){
      if (!validator.isStrongPassword(value)) {
        throw new Error("enter a strong  password"+ value);
    }

    }
  },
  age:{
    type: Number,
    min:18
  },
  gender:{
    type: String,
    validate(value){
       if(!["male","female","others"].includes(value)){
        throw new Error("Invalid gender");
       }
    }
  }, 
  photoUrl:{
    type:String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvts5aHBstDkR8PigS4RmZkbZy78zpZoSuOw&s",
   validate (value){
      if (!validator.isURL(value)) {
        throw new Error("invalid URL"+ value);
    }

    }
  },
  about:{
    type:String,
    maxlength: 300,
    default:" this the default about the user"
  },
location: {
  type: String,
  trim: true,
  maxlength: 100,
  default: "Remote"
},

experienceLevel: {
  type: String,
  enum: ["beginner", "intermediate", "expert"],
 
},

lookingFor: {
  type: [String],
  validate: {
    validator: function (arr) {
      const validOptions = ["co-founder", "mentor", "teammate", "investor", "collaborator"];
      return arr.every(val => validOptions.includes(val));
    },
    message: "Invalid 'lookingFor' value(s)"
  },
 
},

  skills:{
    type:[String],
    validate:{
      validator:function(arr){
        return arr.length<=10;
      },
      message:"you can add a maximum of 10 skills "
    }
  },

  
},{timestamps:true})
  const userModel = mongoose.model("User", userSchema);
 module.exports = userModel;