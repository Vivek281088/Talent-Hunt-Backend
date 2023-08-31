const mongoose = require('mongoose');

 

const express = require('express')

 

const router = express.Router()

 

//const awsQuestions = require('../models/aws')

 
const schema=new mongoose.Schema({
    question:{type:String},
    option:{type:Array}

});
 

 

const questionSchema1 = new mongoose.Schema({

 Manager_Name:{type:String},
 
questions:schema,


duration:{type:Number},
cutoff:{type:Number}


  

 

});

 

 

 

const javaquestion = mongoose.model('Questionpaper', questionSchema1);

 

 

 

module.exports = javaquestion