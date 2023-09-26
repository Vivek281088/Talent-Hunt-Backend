const mongoose = require('mongoose');

 

const express = require('express')

 

const router = express.Router()

const questionSchema = new mongoose.Schema({
  questions: { type: String },
  skill:{type:String}

  
});

const java8_questionSchema = new mongoose.Schema({

    question: { type: String},

 

 

 

    questionType: { type: String },
  
   
  
   
  
   
  
    options: { type: Array },
  
   
  
    skills:{type:String},
  
   
  
    Difficulty_Level:{type:String},
  
   
  
    answer:{type:[String]}


  

 

});

 

 

 

const java8question = mongoose.model('java8_question', java8_questionSchema);

 

 

 

module.exports = java8question