const mongoose = require('mongoose');

 

const questionSchema = new mongoose.Schema({

question: { type: String },

options: { type: Array },

questionType: { type: String }

});

 

const questionpaperSchema = new mongoose.Schema({

questions: [questionSchema],

duration: { type: Number },

cutoff: { type: Number },

skills: { type: String },

Difficulty_Level: { type: String } // Add any additional fields you need

});

 

const Questionpaper = mongoose.model('Questionpaper', questionpaperSchema);

 

module.exports = Questionpaper