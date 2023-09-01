const express = require("express");
const bodyparser = require("body-parser");

const router = express.Router();

const modelskill1 = require("../models/skillset");
//const modelskill2 = require('../models/skillset1')
const modelmanagername = require("../models/managername");
const managername = require("../models/managername");
//const questions = require('../models/questions');

const awsquestion = require("../models/aws");
const javaquestion = require("../models/java");
const Questionpaper=require("../models/questions_M1");

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
router.post("/demo", async (req, res) => {
  const findArray = req.body.skill;
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
});

// router.use(bodyparser.json());

// Adding skills

router.post("/skillnames", async (req, res) => {
  const sname = new modelskill1({
    _id: req.body._id,
    skills: req.body.skills,
    subskills: req.body.subskills,
  });
  try {
    const a = await sname.save();
    res.json(a);
  } catch (error) {
    res.send("Error please check");
  }
});

router.post("/skillnames1", async (req, res) => {
  const sname = new modelskill1({
    skillname: req.body.skillname,
  });
  try {
    const a = await sname.save();
    res.json(a);
  } catch (error) {
    res.send("Error please check");
  }
});
// Adding Manager name

router.post("/mnames", async (req, res) => {
  const mname = new modelmanagername({
    Managername: req.body.Managername,
  });
  try {
    const b = await mname.save();
    res.json(b);
  } catch (error) {
    res.send("Error please check");
  }
});

// Displaying Skill names

router.get("/getskill", async (req, res) => {
  try {
    const skill = await modelskill1.find();

    res.json(skill);
  } catch (err) {
    res.send("Error" + err);
  }
});

//Displaying manager name

router.get("/getmanagername", async (req, res) => {
  try {
    const mname = await modelmanagername.find();

    res.json(mname);
  } catch (err) {
    res.send("Error " + err);
  }
});

//TO FILTER THE PARTICULAR DATA AND SHOW PARTICULAR FIELD QUESTION
router.post("/selected", (req, res) => {
  // const skill = await modelskill.find(
  const selectedoption = req.body.selectedskills;
  console.log(selectedoption);
  // const selectedoption=new modelskill({
  //   soption:req.body.skillname
  // })
  const p1 = [];

  // const filteredSkill = collections.filter(item =>
  //   selectedoption.every(skill=> item.skills) //.include(skill)
  // );
  // console.log(filteredSkill);
  // const mapSkill = filteredSkill.map(item => item.skills);
  // console.log(mapSkill);
  // // console.log("EXAMPLE==",example);

  awsquestion
    .find({ skills: { $in: selectedoption } })
    //modelskill2.find({skillname:{$in:selectedoption}})
    .then((skills) => {
      // res.json(skills)
      // skills.array.forEach(element => {
      //   p1.push(element.skillname)
      // });
      // for (let g of skills){
      //   p1.push(g.skillname)
      // }
      p1.push(skills);
      // p1.push(skills)
      //console.log("skill",skills[0].skillname)
      //res.json(p1)
    });
  javaquestion
    .find({ skills: { $in: selectedoption } })
    //modelskill2.find({skillname:{$in:selectedoption}})
    .then((skills) => {
      // res.json(skills)

      // p1.push(skills)
      // console.log(skills)
      //  for(let g1 of skills){
      //   p1.push(g1.skillname)
      //  }
      p1.push(skills);
      res.json(p1);
    })
    //res.json(p1)
    .catch((error) => {
      res.status(500).json({ error: "Error retrieving from Mongodb" });
    });
});

// router.post("/selected1",(req,res)=>{
//   const
//   const matchingcollection=collections.filter(item=>)
// })

//post aws skill
router.post("/awsquestion", async (req, res) => {
  try {
    const { question, questionType, options, skills,Difficulty_Level } = req.body;

    const newQuestion = new awsquestion({
      // Use the correct model here

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
});

/////post java questions
router.post("/javaquestion", async (req, res) => {
  try {
    const { question, questionType, options, skills,Difficulty_Level } = req.body;

    const newQuestion = new javaquestion({
      // Use the correct model here

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
});

//To post the selected questions into the database



async function storeQuestion(question){


  const questionMap=new Map();
  const mname = await modelmanagername.find();
  //console.log("mname:",mname);
  mname.forEach(item =>{
   if(item.Managername==question.Manager_Name){
    //console.log("mname",item.Managername)
      questionMap.set(item.Managername,)
     
     
     console.log(question.Manager_Name)

   }
  //console.log("ques",questionMap);
   return questionMap;

  });
  //console.log(mname.Managername)
 // for const
}
router.post("/questions",async(req,res)=>{

  const question = new Questionpaper({
    Manager_Name:req.body.Manager_Name,
    questions:req.body.questions,
    duration:req.body.duration,
    cutoff:req.body.cutoff

  });
  let a=[];
  a.push(question.Manager_Name,question.questions,question.duration,question.cutoff);
  //a.forEach(item =>{
    //console.log("a:",a);
  //})
  //console.log(question.Manager_Name)
  try {
    //const result = await storeQuestion(question);
    //console.log("result:",result)
    const a1 = await question.save();
    res.json(a1)
    // .then(result =>{
    //   console.log(result)
    // })

    // const final = JSON.stringify(result);

    // res.setHeader("Content-Type", "application/json");
    // const mapto = {};
    // result.forEach((value, key) => {
    //   mapto[key] = value;

  // });
  // res.send(JSON.stringify(mapto, null, 2));

}
   catch (error) {
    res.send("Error:",error);


  }
});
//get by managername
router.get('/getqbymanagername',async(req,res)=>{
  const Manager_Name=req.body.Manager_Name;
  console.log(Manager_Name)
  try{
  
    if(!Manager_Name)
    {
      return res.status(400).json({error:'Name paramter is required'});
    }
    const qp=await Questionpaper.find({Manager_Name});
    if(!qp || qp.length===0){
      return res.status(404).json({error:'No users found with that name'});
    }
    const questions=qp.map(Questionpaper =>Questionpaper.questions); 
    // const arrayofquestions=[];
    // arrayofquestions.push(questions)
    
    // const mapping=new map();
    //  mapping.set("hi","hi");
    // res.json(questions);
    
    res.setHeader("Content-Type", "application/json");
    const mapto = {};
    mapto[Manager_Name] =questions;
    // questions.forEach((value, key) => {
    //   mapto[key] = value;
    // });
    res.send(JSON.stringify(mapto, null, 2));

  }
  catch(error)
  {
    console.log(error)
    res.status(500).json({error:'Server Error'});

  }

})

router.get("/getquestion", async (req, res) => {
  try {
    const skill = await Question.find();

    res.json(skill);
  } catch (err) {
    res.send("Error" + err);
  }
});

module.exports = router;
