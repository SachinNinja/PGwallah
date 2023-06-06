const mongoose=require('mongoose');
const validator=require('validator');

const ContactSchema= new mongoose.Schema({
Firstname:{
type:String,
required:true,
},
Lastname:{
type:String,
required:true,    
},
Email:{
    type: String,
    trim: true,
    validate:{
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email',
        isAsync: false
      }
},
Message:{
type:String,
required:true
},
});

const Contact = new mongoose.model('Contact',ContactSchema);
module.exports= Contact;