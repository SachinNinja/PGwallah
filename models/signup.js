const mongoose=require('mongoose');

const SignSchema= new mongoose.Schema({
 Username:{
    type:String,
    unique:[true,'Username Already Taken'],
    required:true,
 },
 Email:{
 type:String,
 unique:true,
 required:true
 },
 password:{
 type:String,
 required:true
 }
});

const Signup = new mongoose.model('Signup',SignSchema);

module.exports= Signup;
