const Questionpaper = require("../models/questiondb");
// const Tabledata = require("../models/Tabledata");
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





exports.searchManager = async (req, res) => {
  const Managername = req.body.filterManager; // Make sure the field name matches the request body
  const Skill = req.body.filterSkills;

  try {
    let query = {};

    if (Managername) {
      // Perform a case-insensitive search for ManagerName
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



// exports.searchManager = async (req, res) => {
//   const { filterManager, filterSkills } = req.body;
//   console.log("Body:", req.body);

//   try {
//     let query = {};

//     if (filterManager) {
//       query.Managername = filterManager;
//     }

//     if (filterSkills && filterSkills.length > 0) {
//       query.Skill = { $in: filterSkills };
//     }
    

//     console.log("API Query:", query);

//     const results = await Questionpaper.find(query);

//     console.log("API Results:", results);

//     const responseData = results.map((entry) => ({
//       Managername: entry.Managername,
//       fileName: entry.fileName,
//       isCreate: entry.isCreate,
//       isEdit: entry.isEdit,
//       isMail: entry.isMail,
//     }));

//     res.json(responseData);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



exports.existing_user_data = async (req, res) => {
  try {
    const skill1 = await Questionpaper.find();

    res.json(skill1);
  } catch (err) {
    res.send("Error" + err);
  }
};
