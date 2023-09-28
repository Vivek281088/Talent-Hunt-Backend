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

  const secretkey='awse';
  async function verifyuser(name,password){
    const candidate=await modelcandiate.findOne({name});
    const manager=await modelmanagername.findOne({name});
    console.log("cand",candidate)
    console.log("manager",manager)

    if(candidate){
      if(candidate.password===password){

        return{role:'user',username:candidate.name,permissions:candidate.Permissions};

      }
    }
    // if(mana)

    if(manager){
      if(manager.password===password){

        return{role:'manager',username:manager.Managername,permissions:manager.Permissions};

      }
    }

    return null;
  }
exports.authenticate=async(req,res)=>{
  const{name,password}=req.body;

  const user=await verifyuser(name,password);

  if(user){
    const token=jwt.sign({Managername:user.name,role:user.role},secretkey,{expiresIn:'1hr'});

    res.json({status:200,message:'Aauthentication Successful',token,role:user.role,permissions:user.permissions});
    
  }
  else{
    res.status(401).json({status:400,message:'Authentication Failed'});
  }
}