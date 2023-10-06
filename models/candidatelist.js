const mongoose = require("mongoose");

const express = require("express");

const router = express.Router();

const questionSchema = new mongoose.Schema({
  question: { type: String },

  options: { type: Array },

  questionType: { type: String },

  skills: { type: String },

  Difficulty_Level: { type: String },
});

const candidatedetails = new mongoose.Schema({
  email_Managername: { type: String, required: true },

  candidateName: { type: String},

  candidateEmail: { type: String, required: true },

  candidatePhone: { type: Number, required: true },

  email_Status: { type: String, required: true },

  email_Filename: { type: String, required: true },

  questions: [questionSchema],
  
  score: {type:  Number},

  result: {type: String},

  cutoff : {type: Number},

  duration : {type: Number},

  password:{
    type:String,
    
  },
  confirmPassword:{
    type:String,
    
  },
  Permissions:{
    type:String,
    
  },
  role:{
    type:String,
    
  }

});

module.exports = mongoose.model("candidatelist", candidatedetails);
