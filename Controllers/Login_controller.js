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
      res.status(500).json({ error: "Error saving manager data" });
  
      res.status(500).json({ error: error.message });
    }
  };

  exports.signin=async(req,res)=>{
    const{Managername,password}=req.body;

    const manager=await modelmanagername.findOne({Managername,password});

    if(manager)
    {
      res.status(200).json("login success");
    }
    else{
      res.status(200).json("login failed");
    }


  }

exports.authenticate=async(req,res)=>{
  const{username,password}=req.body;

  const user=await verifyuser(username,password);

  if(user){
    
  }
}