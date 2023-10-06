const mongoose = require("mongoose");

 

const questionSchema = new mongoose.Schema({

  question: { type: String },

 

  options: { type: Array },

 

  questionType: { type: String },

 

  skills: { type: String },

 

  Difficulty_Level: { type: String },

 

  Selected : {type : Boolean},

  answer: {type: [String]}

});

 

const questionpaperSchema = new mongoose.Schema({

  questions: [questionSchema],

 

  duration: { type: Number },

 

  cutoff: { type: Number },

 

  Skill: { type: Array },

 

  fileName: { type: String },

 

  isCreate: { type: Boolean },

 

  isEdit: { type: Boolean },

 

  isMail: { type: Boolean },

 

  Managername: { type: String },

});

 

const Questionpaper = mongoose.model("Questionpaper", questionpaperSchema);

 

module.exports = Questionpaper;