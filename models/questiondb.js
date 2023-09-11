const mongoose = require('mongoose');

 

const questionSchema = new mongoose.Schema({

Questions: { type: String },

options: { type: Array },

questionType: { type: String }

});

 

const questionpaperSchema = new mongoose.Schema({
    Managername:{trype:String},

questions: [questionSchema],

duration: { type: Number },

cutoff: { type: Number },

skills: { type: String },

Difficulty_Level: { type: String } 

});

 

const Questionpaper = mongoose.model('Questionpaper', questionpaperSchema);

 

module.exports = Questionpaper