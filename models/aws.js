const mongoose = require('mongoose');

 

const express = require('express')

 

const router = express.Router()

const questionSchema = new mongoose.Schema({


  question: { type: String},

 

  questionType: { type: String },

 

  options: { type: Array },

  skills:{type:String},

  Difficulty_Level:{type:String}

 

});

 
const Question = mongoose.model('awsquestion', questionSchema);

module.exports = Question