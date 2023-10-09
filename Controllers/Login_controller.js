"use strict";

const modelmanagername = require("../models/managername");
const modelcandiate = require("../models/candidatelist");
const candidateassessment = require("../models/candidate_assessment");
const candidatelist = require("../models/candidatelist");
// const express=require('express');
const bodyparser = require("body-parser");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
const CryptoJS = require("crypto-js");

exports.signup = async (req, res) => {
  const { Managername, candidateEmail, phoneNumber, password, confirmPassword } = req.body;

  console.log(password, confirmPassword, phoneNumber);
  const newManager = new modelmanagername({
    Managername,

    candidateEmail,

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
    // console.l
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
  console.log("pass",password)

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
  const { Managername, candidateEmail, password, confirmPassword } = req.body;

  if (password != confirmPassword) {
    return res.json({ status: 404 });
  } else {
    try {
      const user = await modelmanagername.findOne({ Managername, candidateEmail });
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

// Getting candidate details based on Email and Password
exports.fetching_candidate_details = async (req, res) => {
  const { candidateEmail } = req.body;

  try {
    const user = await modelcandiate.find({ candidateEmail });

    if (!user) {
      return res.status(404).json({ message: "Usernot found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { _id, email_Status } = req.body;

    // Update the score and result in the database

    await candidatelist.findByIdAndUpdate(_id, { email_Status });

    res.json({
      success: true,

      message: "Status updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message: "An error occurred while updating Status",
    });
  }
};
//post candidate details for reviewer

exports.candidateassessment = async (req, res) => {
  const {
    candidateName,
    questions,
    selectedOption,
    startTime,
    endTime,
    cutoff,
    duration,
  } = req.body;

  const newCandidate = new candidateassessment({
    candidateName,

    questions,

    selectedOption,

    startTime,

    endTime,

    cutoff,

    duration,
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

exports.candidate_list = async (req, res) => {
  try {
    const candidatelist1 = await candidateassessment.find();

    res.json(candidatelist1);
  } catch (err) {
    res.send("Error" + err);
  }
};

exports.reviewer_update = async (req, res) => {
  try {
    const { _id, score, result } = req.body;

    // Update the score and result in the database

    await candidatelist.findByIdAndUpdate(_id, { score, result });

    res.json({
      success: true,

      message: "Score and result updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message: "An error occurred while updating score and result",
    });
  }
};
