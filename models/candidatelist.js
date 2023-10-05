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

  name: { type: String, required: true },

  candidateEmail: { type: String, required: true },

  candidatePhone: { type: Number, required: true },

  email_Status: { type: String, required: true },

  email_Filename: { type: String, required: true },

  questions: [questionSchema],
  password:{
    type:String,
    required:true
  },
  confirmPassword:{
    type:String,
    required:true
  },
  Permissions:["candidatepage"],
  role:["user"]

});

module.exports = mongoose.model("candidatelist", candidatedetails);
