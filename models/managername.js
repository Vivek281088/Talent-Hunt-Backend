const mongoose = require('mongoose')

const express = require('express')

const router = express.Router()

const modelmanagername = require('../models/managername')

 


    const hiringmanager = new mongoose.Schema({

  
        Managername: {
    
            type:String
    
           
    
        },

        candidateEmail:{
        type:String
       
       },

       phoneNumber:{
        type:Number
       },

      password:{
        type:String
       
      },
      confirmPassword:{
        type:String
       
      },
      Permissions:["manager"],
      role:["managerpage"]






    
        })

 

module.exports=mongoose.model('managername',hiringmanager)