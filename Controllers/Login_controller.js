const modelmanagername = require("../models/managername");
const candidateAssessment=require("../models/candidate_assessment")


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


  