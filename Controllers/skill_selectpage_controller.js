const modelskill = require("../models/skillset");
const modelmanagername = require("../models/managername");

const Questionpaper = require("../models/questiondb");
const awsquestion = require("../models/aws");
const javaquestion = require("../models/java8");
const java_8_question = require("../models/java8");
const GraphQL_question = require("../models/graphql");
const Nodejs_question = require("../models/nodejs")
const SpringBoot_question = require("../models/springboot");


const a = new Map();
a.set("Java-8", java_8_question);
a.set("GraphQL", GraphQL_question);
a.set("Nodejs", Nodejs_question);
a.set("SpringBoot", SpringBoot_question);
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
        const { question, questionType, options, skills, Difficulty_Level, answer} = req.body;
    
        const newQuestion = new awsquestion({
          question,
    
          questionType,
    
          options,
    
          skills,

          Difficulty_Level,

          answer
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
      const { question, questionType, options, skills, Difficulty_Level} = req.body;
  
      const newQuestion = new javaquestion({
        question,
  
        questionType,
  
        options,
  
        skills,

        Difficulty_Level
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


  exports.post_java_8_question=async(req,res)=>{
    try {
        const { question, questionType, options, skills, Difficulty_Level,answer} = req.body;
    
        const newQuestion = new java_8_question({
          question,
    
          questionType,
    
          options,
    
          skills,

          Difficulty_Level,

          answer
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

exports.post_GraphQL_question =async (req, res) => {
  try {
    const { question, questionType, options, skills, Difficulty_Level,answer} = req.body;

    const newQuestion = new GraphQL_question({
      question,

      questionType,

      options,

      skills,

      Difficulty_Level,

      answer
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

exports.post_Nodejs_question =async (req, res) => {
  try {
    const { question, questionType, options, skills, Difficulty_Level,answer} = req.body;

    const newQuestion = new Nodejs_question({
      question,

      questionType,

      options,

      skills,

      Difficulty_Level,

      answer
    });

    await newQuestion.save();

    res.status(201).json({ message: "Question added successfully!" });
  } catch (error) {
    console.error("Error:", error);

    res

      .status(500)

      .json({ error });
  }
};

exports.post_SpringBoot_question =async (req, res) => {
  try {
    const { question, questionType, options, skills, Difficulty_Level,answer} = req.body;

    const newQuestion = new SpringBoot_question({
      question,

      questionType,

      options,

      skills,

      Difficulty_Level,

      answer
    });

    await newQuestion.save();

    res.status(201).json({ message: "Question added successfully!" });
  } catch (error) {
    console.error("Error:", error);

    res

      .status(500)

      .json({ error });
  }
};

  exports.storequestions =async(req,res)=>{
    const dataToSave = req.body.ques;

    try {
      const questionpaper = new Questionpaper({
        questions: dataToSave.Questions,
  
        duration: dataToSave.duration,
  
        cutoff: dataToSave.cutoff,
  
        Skill: dataToSave.Skill,

        fileName: dataToSave.fileName,
        
        Managername: dataToSave.Managername,
        
        isCreate: dataToSave.isCreate,

        isEdit: dataToSave.isEdit,
        
        isMail: dataToSave.isMail,
      });
  
      const savedQuestionpaper = await questionpaper.save();
  
      res.json(savedQuestionpaper);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error saving data", message: error.message });
    }
  }

exports.latest_version = async (req, res) => {
   try {
      const { Managername, Skill } = req.body;
      const sortedSkill = Skill.slice().sort();

    // Query the database to find the latest version
    const latestVersionRecord = await Questionpaper.findOne({
      Managername,
      Skill : sortedSkill
    })
      .sort("-fileName")
      .exec();

    if (!latestVersionRecord) {
      // If no records match, return undefined
      return res.json(undefined);
    }

    // Extract and return the latest version from the fileName
    const latestVersionNumber = extractVersionNumber(
      latestVersionRecord.fileName
    );

    res.json(latestVersionNumber);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}


// Helper function to extract version number from fileName
function extractVersionNumber(fileName) {
  const match = fileName.match(/_v(\d+)$/);
  return match ? parseInt(match[1]) : 1;
}