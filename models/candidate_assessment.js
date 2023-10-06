const mongoose = require("mongoose");

const express = require("express");

const router = express.Router();

const questionSchema = new mongoose.Schema({
  question: { type: String },

  options: { type: Array },

  questionType: { type: String },

  skills: { type: String },

  Difficulty_Level: { type: String },

  answer: { type: [String] },

  selectedOption: { type: [String] },
});

const candidate_assessment = new mongoose.Schema({
  candidateName: { type: String, required: true },

  questions: [questionSchema],
  selectedOption: { type: [String] },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  cutoff: { type: Number, required: true },
  duration: { type: Number, required: true },
});

module.exports = mongoose.model("candidate_assessment", candidate_assessment);
