const Questionpaper = require("../models/questiondb");
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
  const { managerName, skills } = req.body;

  try {
    let query = {};

    if (managerName) {
      query.managerName = managerName;
    }

    if (skills && skills.length > 0) {
      query.skills = { $in: skills };
    }

    const results = await Questionpaper.find(query);

    const responseData = results.map((entry) => ({
      managerName: entry.managerName,

      fileName: entry.fileName,

      create: entry.create,

      edit: entry.edit,

      mail: entry.mail,
    }));

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
