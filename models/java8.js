const mongoose = require('mongoose');

 

const express = require('express')

 

const router = express.Router()

 

const questionSchema1 = new mongoose.Schema({

 

  question: { type: String, required: true },

 

  questionType: { type: String, required: true },

 

  options: { type: Array, required: true },

  skills:{type:String,required:true},
  
  Difficulty_Level:{type:String},
  
  
///from signup branch
//commit from branch  
//
 

});

 

 

 

const javaquestion = mongoose.model('java8_question', questionSchema1);

 

 

 

module.exports = javaquestion