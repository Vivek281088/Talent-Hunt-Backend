const Questionpaper = require("../models/questiondb");

const candidate = require("../models/candidatelist");

let optionsState = {
  create: false,

  edit: false,

  mail: false,
};

exports.create_button_enable = async (req, res) => {
  const selectedManagerName = req.body.ManagerName;

  console.log(`selected manager name received: ${selectedManagerName}`);

  if (selectedManagerName) {
    optionsState.create = true;
  } else {
    optionsState.create = false;
  }

  res.json(optionsState);
};

exports.post_table_content = async (req, res) => {
  const { managerName, fileName, isCreate, isEdit, isMail } = req.body;

  const newManager = new Manager({
    managerName,

    fileName,

    isCreate,

    isEdit,

    isMail,
  });

  try {
    const savedManager = await newManager.save();

    res.json(savedManager);
  } catch (error) {
    res.status(500).json({ error: "Error saving manager data" });

    res.status(500).json({ error: error.message });
  }
};

exports.getselectedSkill_Question = async (req, res) => {
  const { selectedSkill, selectedQuestions } = req.body;
};

exports.searchManager = async (req, res) => {
  const Managername = req.body.filterManager;
  const Skill = req.body.filterSkills;

  try {
    let query = {};

    if (Managername) {
      query.Managername = { $regex: new RegExp(Managername, "i") };
    }

    if (Skill && Skill.length > 0) {
      query.Skill = { $in: Skill };
    }

    const results = await Questionpaper.find(query);

    const responseData = results.map((entry) => ({
      Managername: entry.Managername,
      fileName: entry.fileName,
      isCreate: entry.isCreate,
      isEdit: entry.isEdit,
      isMail: entry.isMail,
    }));

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//view
exports.view_question_paper = async (req, res) => {
  try {
    const { fileName, Managername } = req.body;
    // Use Mongoose to find data based on fileName
    const data = await Questionpaper.find({ fileName, Managername });

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    // Return the data as JSON
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.view_fetch = async (req, res) => {
  try {
    const data = await Questionpaper.find();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//edit

exports.edit_questions = async (req, res) => {
  try {
    const { Managername, fileName, questions, cutoff, duration } = req.body;
    const query = { Managername, fileName };

    // Assuming updatedQuestions is an array of objects with questionText property
    const update = {
      $set: { questions: questions, cutoff: cutoff, duration: duration },
    };

    const options = { upsert: true }; // Create a new entry if it doesn't exist

    await Questionpaper.updateOne(query, update, options);

    res.status(200).json({ message: "Questions updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating questions" });
  }
};

exports.existing_user_data = async (req, res) => {
  try {
    const skill1 = await Questionpaper.find();

    res.json(skill1);
  } catch (err) {
    res.send("Error" + err);
  }
};

//candidate name list

exports.Candidatepage = async (req, res) => {
  const {
    email_Managername,
    candidateName,
    candidateEmail,
    candidatePhone,
    email_Status,
    email_Filename,
    questions,
  } = req.body;



  const newCandidate = new candidate({

    email_Managername,

    candidateName,

    candidateEmail,

    candidatePhone,

    email_Status,

    email_Filename,

    questions,
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

//retriving candidate list

exports.existing_candidate_list = async (req, res) => {
  try {
    const candidatelist1 = await candidate.find();

    res.json(candidatelist1);
  } catch (err) {
    res.send("Error" + err);
  }
};

