const express     = require('express')
const mongoose    = require('mongoose')
const morgan      = require('morgan')

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/Pgwallah',{useNewUrlParser:true, useUnifiedTopology:true})
const db=mongoose.connection
db.on('error',()=>{
    console.log('No connection')
})
db.once('open',()=>{
    console.log('Database is now Connected');
})