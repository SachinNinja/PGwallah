const express = require("express");
const fs= require('fs');
const hbs = require('hbs');
const multer=require('multer');
const bodyParser=require('body-parser');
const nodemailer=require('nodemailer');
const path=require('path');
const app=express();
const exphbs = require('express-handlebars');

const port=process.env.PORT || 3000;

const { default: mongoose } = require("mongoose");

require("./conn");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname,'resourses')));
app.set('view engine','hbs');

//Aquiring Schemas
const Signup = require('./models/signup');
const Contact= require('./models/contact');
const PgData= require('./models/Pgdetail');

let obj= new Signup({
  Username:"User"
});

//route code
app.get("/",(req,res)=>{
  res.render('index');
});
app.get("/apply",(req,res)=>{
  res.render('apply');
});
app.get("/index",(req,res)=>{
  res.render('index');
})
app.get("/about",(req,res)=>{
  res.render('about');
});
app.get("/login",(req,res)=>{
  res.render('login');
});
app.get("/services",(req,res)=>{
  res.render('services');
});
app.get("/dehradun",(req,res)=>{
  res.render('dehradun');
});
app.get("/delhi",(req,res)=>{
  res.render('delhi');
});
app.get("/contact",(req,res)=>{
  res.render('contact');
});
app.get("/ownerRecord",(req,res)=>{
  res.render('ownerRecord');
});


//Signup route
app.post('/signup',async(req,res)=>{
   try{
   const password= req.body.password;
   const password2= req.body.password2;
   if(password===password2){
    const signUp= new Signup({
      Username:req.body.Username,
      Email: req.body.Email,
      password: req.body.password
    });
    const result= await signUp.save();
    res.status(201).render('login');
   }else{
    res.send('Passwords do not match please try again!');
   }
   }catch(err){
    res.status(404).send(err);
   }
});


//Login route 
app.use('/loginform',async(req,res)=>{
 try{
  const email=req.body.Email;
  const password=req.body.password;
  const result=await Signup.findOne({Email:email});
  obj.Username=result.Username;
  console.log(obj);
  if(!result){
    res.send('Email not registered');
  }
  else{
    if(result.password===password){
      res.render('home',{obj});
    }else{
      res.send('Username or password invalid!!');
    }
  }
 }catch(err){
  res.status(404).send(err);
 }
});

//Home root after login
app.get("/home",(req,res)=>{
  res.render('home',{obj});
})

//Contact form route
app.post('/contact',async(req,res)=>{
try{
const Firstname=req.body.Firstname;
const Lastname=req.body.Lastname;
const Email=req.body.Email;
const Message=req.body.Message;
const contact= new Contact({
  Firstname:Firstname,
  Lastname:Lastname,
  Email:Email,
  Message: Message
});
const result= await contact.save();

let testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pgwallah01@gmail.com',
        pass: 'qvyoigsrbztffhjp'
    }
});
//Nodemailer 

let info = await transporter.sendMail({
    from: '"PG wallah Site" <pgwallah01@gamil.com>', 
    to: "pgwallah01@gmail.com", 
    subject: "Contact Form", 
    text: "Name :   "+contact.Firstname+"   "+contact.Lastname+"         " +"Email Id:   "+ contact.Email+"          Message:        "+contact.Message,
  });

console.log("Message sent: %s", info.messageId);
res.render('success');

}catch(err){
res.status(404).send(err);
}
});

//Finding owner record 
app.get('/find',async(req,res)=>{
try{
const data = await PgData.find();
res.render('ownerRecord',{data});
}catch(err){
  res.status(404).send(err);
}
});

//uploading owner data
const Storage = multer.diskStorage({
  destination:'uploads',
  filename:(req,file,cb)=>{
    cb(null,file.originalname);
    },
});

const upload = multer({
  storage:Storage
}).single('Image');

app.post('/PG',(req,res)=>{
  upload(req,res,(err)=>{
    if(err){
      console.log(err);
    }
  else{
  const newpg= new PgData({
  Name: req.body.Name,
  PhoneNumber:req.body.PhoneNumber,
  Email:req.body.Email,
  Place:req.body.Place,
  Address: req.body.Address,
  Image:{
    data:req.file.filename,
    contentType:'Image/jpg/png/jpeg',
  },
  Description:req.body.Description,
  Rent:req.body.Rent,
  });
  const phone=req.body.PhoneNumber;
  if(phone.length>10||phone.length<10||isNaN(phone)){
   res.status(404).send("Phone Number Not valid, Please Enter Again !!");
  }
  const rent=req.body.Rent;
  if(isNaN(rent)){
   res.status(404).send("Rent should be numeric !!"); 
  }
  else{
  newpg.save().then(()=>{
  res.render("success");
  }).catch((err)=>{
    console.log(err);
  });
}
}
});
});



//Finding pg as per place 
app.post('/findPg',async(req,res)=>{
  try{
  const Place= req.body.Place;
  const data = await PgData.find({Place: Place});
  console.log(data);
  if(data.length===0){
    res.send('Sorry , No Data found !!');
  }else{
   res.render('ownerRecord',{data});
  }
  }catch(err){
    res.status(404).send(err);
  }
});


//Port 
app.listen(port,()=>{
  console.log('server is running at port no 3000');
});