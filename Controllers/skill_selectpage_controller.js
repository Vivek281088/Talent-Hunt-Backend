const modelskill = require("../models/skillset");
const modelmanagername = require("../models/managername");
const managername = require("../models/managername");
const Questionpaper = require("../models/questiondb");
const awsquestion = require("../models/aws");
const javaquestion = require("../models/java");

const collections = [awsquestion, javaquestion];
const a = new Map();
a.set("JAVA", javaquestion);
a.set("AWS", awsquestion);
async function fetchQuestions(findArray) {
  const valueMap = new Map();

  for (const a1 of findArray) {
    for (const [key, value] of a) {
      if (key == a1) {
        const skill1 = await value.find();

        valueMap.set(key, skill1);
      }
    }
  }

  return valueMap;
}
exports.question_byskills=async(req,res) =>{

    const findArray = req.body.selectedSkill;

      try {
        const result = await fetchQuestions(findArray);
    
        const final = JSON.stringify(result);
    
        res.setHeader("Content-Type", "application/json");
    
        const mapto = {};
    
        result.forEach((value, key) => {
          mapto[key] = value;
        });
    
        res.send(JSON.stringify(mapto, null, 2));
      } catch (error) {
        res.send("Error please check");
      }
}

exports.post_skills=async(req,res) =>{
    const sname = new modelskill({
        _id: req.body._id,
    
        skill: req.body.skill,
    
        subskills: req.body.subskills,
      });
    
      try {
        const a = await sname.save();
    
        res.json(a);
      } catch (error) {
        res.send("Error please check");
      }
}

exports.post_managernames=async(req,res)=>{
    const mname = new modelmanagername({
        Managername: req.body.Managername,
      });
    
      try {
        const b = await mname.save();
    
        res.json(b);
      } catch (error) {
        res.send("Error please check");
      }
}

exports.get_skills=async(req,res)=>{
    try {
        const skill = await modelskill.find();
    
        res.json(skill);
      } catch (err) {
        res.send("Error" + err);
      }
}

exports.get_managername=async(req,res)=>{
    try {
        const skill = await modelmanagername.find();
    
        res.json(skill);
      } catch (err) {
        res.send("Error " + err);
      }
}

exports.post_awsquestion=async(req,res)=>{
    try {
        const { question, questionType, options, skills } = req.body;
    
        const newQuestion = new awsquestion({
          question,
    
          questionType,
    
          options,
    
          skills,
        });
    
        await newQuestion.save();
    
        res.status(201).json({ message: "Question added successfully!" });
      } catch (error) {
        console.error("Error:", error);
    
        res
    
          .status(500)
    
          .json({ error: "An error occurred while adding the question." });
      }
}


exports.post_javaquestion =async (req, res) => {
    try {
      const { question, questionType, options, skills } = req.body;
  
      const newQuestion = new javaquestion({
        question,
  
        questionType,
  
        options,
  
        skills,
      });
  
      await newQuestion.save();
  
      res.status(201).json({ message: "Question added successfully!" });
    } catch (error) {
      console.error("Error:", error);
  
      res
  
        .status(500)
  
        .json({ error: "An error occurred while adding the question." });
    }
  };

  exports.storequestions =async(req,res)=>{
    const dataToSave = req.body.ques;

    try {
      const questionpaper = new Questionpaper({
        questions: dataToSave.Questions,
  
        duration: dataToSave.duration,
  
        cutoff: dataToSave.cuttoff,
  
        skills: dataToSave.skills,
      });
  
      const savedQuestionpaper = await questionpaper.save();
  
      res.json(savedQuestionpaper);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error saving data", message: error.message });
    }
  }

