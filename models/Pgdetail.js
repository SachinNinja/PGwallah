const mongoose=require('mongoose');
const validator = require('validator');

const PgSchema = new mongoose.Schema({

Name:{
type:String,
required:[true,'Please Enter a valid Name'],
},
PhoneNumber:{
type:Number,
required:[true,'Please Enter the phone number '],
},
Email:{
type:String,
required:[true,'Enter Email']
},
Place:{
type:String,
required:[true,'Please Enter the place'],
},
Address:{
type:String,
required:[true,'Please Enter Address'],
},
Image:{
data:Buffer,
contentType: String,
},
Description:{
type:String,
required:[true,'Please Enter the description of the PG']
},
Rent:{
type:Number,
required:[true,'Please Enter the rent'],
}
},{timestamps:true});

const Pgdata= new mongoose.model('Pgdata',PgSchema);

module.exports= Pgdata;