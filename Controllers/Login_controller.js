const modelmanagername = require("../models/managername");
const candidateAssessment=require("../models/candidate_assessment")
"use strict";

const modelmanagername = require("../models/managername");
const modelcandiate = require("../models/candidatelist");
// const express=require('express');
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const CryptoJS = require("crypto-js");

exports.signup = async (req, res) => {
  const { name, emailId, phoneNumber, password, confirmPassword } = req.body;

  console.log(password, confirmPassword, phoneNumber);
  const newManager = new modelmanagername({
    name,

    emailId,

    phoneNumber,

    password,

    confirmPassword,
  });
  // if(password==confirmPassword){
  try {
    if (password == confirmPassword) {
      console.log("entered");
      const savedManager = await newManager.save();
      res.json(savedManager);
    } else {
      console.log("er");
      res.status(200).json({ status: 404 });
      // res.status()
    }
  









  //post candidate details for reviewer
  

exports.candidateassessment = async (req, res) => {
  const { candidateName,questions ,selectedOption ,startTime ,endTime ,cutoff ,duration }=req.body
 


  const newCandidate = new candidateAssessment({

    candidateName,

    questions ,
    selectedOption ,
    startTime ,
    endTime ,
    cutoff ,
    duration 
  });

  try {
    const savedCandidate = await newCandidate.save();

    console.log("sd", savedCandidate);

    res.json(savedCandidate);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error saving candidate data: " + error.message });
  }
};


  
  } catch (error) {
    res.status(500).json({ error });

    res.status(500).json({ error: error.message });
  }
  // }
  // else{
  // }
};

exports.signin = async (req, res) => {
  const { Managername, password } = req.body;

  const manager = await modelmanagername.findOne({ Managername, password });

  if (manager) {
    res.status(200).json("login success");
  } else {
    res.status(200).json("login failed");
  }
};

const secretkey = "awse";
async function verifyuser(candidateEmail, password) {
  const candidate = await modelcandiate.findOne({ candidateEmail });
  const manager = await modelmanagername.findOne({ candidateEmail });
  console.log("cand", candidate);
  console.log("manager", manager);

  if (candidate) {
    if (candidate.password === password) {
      return {
        role: "user",
        username: candidate.name,
        permissions: candidate.Permissions,
      };
    }
  }
  // if(mana)

  if (manager) {
    console.log("hi from manager",manager.password)
      console.log("hi from managerpass",password)                                                         
    if (manager.password === password) {
      console.log("hi from manager",manager.password)
      console.log("hi from managerpass",password)

      return {
        role: "manager",
        username: manager.Managername,
        permissions: manager.Permissions,
      };
    }
  }

  return null;
}
exports.authenticate = async (req, res) => {
  const { candidateEmail, password } = req.body;
  //console.log("pass",password)

  const encryptionKey = "123456qwertyuio";

  const ivBase64 = "yourInitializationVector"; // Use the same base64 IV used for encryption

  function decryptData(encryptedData) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey, {
      iv: CryptoJS.enc.Base64.parse(ivBase64), // Parse base64 IV

      mode: CryptoJS.mode.CBC,

      padding: CryptoJS.pad.Pkcs7,
    });

    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  }
  const decryptedData = decryptData(password);

  console.log("Decrypted Data:", decryptedData);
  console.log("before", password);
 console.log("backend Password Recieved" ,decryptedData )
  const user = await verifyuser(candidateEmail, decryptedData);

  if (user) {
    // const token=jwt.sign({Managername:user.name,role:user.role},secretkey,{expiresIn:'1hr'});

    res.json({
      status: 200,
      message: "Aauthentication Successful",
      role: user.role,
      permissions: user.permissions,
    });
  } else {
    res.json({ status: 400});
  }
};

exports.forgotpassword = async (req, res) => {
  const { name, emailId, password, confirmPassword } = req.body;

  if (password != confirmPassword) {
    return res.json({ status: 404 });
  } else {
    try {
      const user = await modelmanagername.findOne({ name, emailId });
      console.log("user", user);
      if (!user) {
        return res.json({ status: 200 });
      }

      user.password = password;
      user.confirmPassword = confirmPassword;
      await user.save();
      return res.status(200).json({ message: "password updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal serve error" });
    }
  }
};
