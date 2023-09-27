const modelmanagername = require("../models/managername");
const modelcandiate=require("../models/candidatelist");
// const express=require('express');
const bodyparser=require('body-parser');
const jwt=require('jsonwebtoken');


exports.signup = async (req, res) => {
    const { Managername, emailId, phoneNumber, password, confirmPassword } = req.body;
  
    const newManager = new modelmanagername({
      Managername,
  
      emailId,
  
      phoneNumber,
  
      password,
  
      confirmPassword,
    });
  
    try {
      const savedManager = await newManager.save();
  
      res.json(savedManager);
    } catch (error) {
      res.status(500).json({ error});
  
      res.status(500).json({ error: error.message });
    }
  };

  exports.signin=async(req,res)=>{
    const{Managername,password}=req.body;

    const manager=await modelmanagername.findOne({Managername,password});

    if(manager)
    {
      res.status(200).json("login success");
    }
    else{
      res.status(200).json("login failed");
    }


  }

  const secretkey='';
  async function verifyuser(username,password){
    const candidate=await modelcandiate.findOne({username});
    const manager=await modelmanagername.findOne({username});
    if(candidate){
      if(candidate.password===password){

        return{role:'user',username:candidate.candidateName,permissions:candidate.permissions};

      }
    }
    // if(mana)

    if(manager){
      if(manager.password===password){

        return{role:'manager',username:manager.Managername,permissions:manager.permissions};

      }
    }

    return null;
  }
exports.authenticate=async(req,res)=>{
  const{username,password}=req.body;

  const user=await verifyuser(username,password);

  if(user){
    const token=jwt.sign({username:user.username,role:user.role},secretkey,{expiresIn:'1hr'});

    res.json({success:true,message:'Aauthentication Successful',token});
    
  }
  else{
    res.status(401).json({success:false,message:'Authentication Failed'});
  }
}