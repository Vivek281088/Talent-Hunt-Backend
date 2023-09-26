const mongoose = require('mongoose')

const express = require('express')

const router = express.Router()

const modelmanagername = require('../models/managername')

 


    const hiringmanager = new mongoose.Schema({

        Managername: {
    
            type:String,
    
            required: true
    
        },

       emailId:{
        type:String,
        required:true
       },

       phoneNumber:{
        type:Number,
        required:true
       },

      password:{
        type:String,
        required:true
      },
      confirmPassword:{
        type:String,
        required:true
      }


    
        })

 

module.exports=mongoose.model('managername',hiringmanager)