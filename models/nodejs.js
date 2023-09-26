const mongoose = require('mongoose');

 

const express = require('express')

 

const router = express.Router()


const Nodejs_questionSchema = new mongoose.Schema({

 

    question: { type: String},

 

 

 

    questionType: { type: String },
  
   
  
   
  
   
  
    options: { type: Array },
  
   
  
    skills:{type:String},
  
   
  
    Difficulty_Level:{type:String},
  
   
  
    answer:{type:[String]}

  

  

 

});

 

 

 

const nodejsquestion = mongoose.model('Nodejs_question', Nodejs_questionSchema);

 

 

 

module.exports = nodejsquestion