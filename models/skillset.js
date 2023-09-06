const mongoose = require('mongoose')

const express = require('express')

const router = express.Router()

const skill = new mongoose.Schema({
    _id:{
        type:Number,
        required:true,
        autoIncrement:true
    },
    
    skill: {

        type:String,
        required: true

    },
    subskills:{
        type:Array

    }

    })
    

 

module.exports = mongoose.model('skilllist', skill)
