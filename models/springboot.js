const mongoose = require('mongoose');

 

const express = require('express')

 

const router = express.Router()

const questionSchema = new mongoose.Schema({
  questions: { type: String },
  skill:{type:String}

  
});

const SpringBoot_questionSchema = new mongoose.Schema({

 

    question: { type: String},

 

 

 

    questionType: { type: String },
  
   
  
   
  
   
  
    options: { type: Array },
  
   
  
    skills:{type:String},
  
   
  
    Difficulty_Level:{type:String},
  
   
  
    answer:{type:[String]}


  

 

});

 

 

 

const springbootquestion = mongoose.model('SpringBoot_question', SpringBoot_questionSchema);

 

 

 

module.exports = springbootquestion