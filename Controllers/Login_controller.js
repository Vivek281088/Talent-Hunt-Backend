const modelmanagername = require("../models/managername");
const modelcandiate = require("../models/candidatelist");
// const express=require('express');
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const candidatelist = require("../models/candidatelist");
const candidateAssessment = require("../models/candidate_assessment");

exports.signup = async (req, res) => {
  const { Managername, emailId, phoneNumber, password, confirmPassword } =
    req.body;

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
    res.status(500).json({ error });

    res.status(500).json({ error: error.message });
  }
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
async function verifyuser(name, password) {
  const candidate = await modelcandiate.findOne({ name });
  const manager = await modelmanagername.findOne({ name });
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
    if (manager.password === password) {
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
  const { name, password } = req.body;

  const user = await verifyuser(name, password);

  if (user) {
    const token = jwt.sign(
      { Managername: user.name, role: user.role },
      secretkey,
      { expiresIn: "1hr" }
    );

    res.json({
      status: 200,
      message: "Aauthentication Successful",
      token,
      role: user.role,
      permissions: user.permissions,
    });
  } else {
    res.status(401).json({ status: 400, message: "Authentication Failed" });
  }
};

// Getting candidate details based on Email and Password
exports.fetching_candidate_details = async (req, res) => {
  const { candidateEmail } = req.body;

  try {
    const user = await candidatelist.find({ candidateEmail });

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

  const newCandidate = new candidateAssessment({
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
    const candidatelist1 = await candidateAssessment.find();

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
