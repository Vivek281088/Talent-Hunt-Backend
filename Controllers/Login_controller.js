const modelmanagername = require("../models/managername");


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