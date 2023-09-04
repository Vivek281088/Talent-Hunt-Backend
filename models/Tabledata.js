const mongoose = require('mongoose');

 

const managerSchema = new mongoose.Schema({

  managerName: String,

  fileName: String,

  canCreate: Boolean,

  canEdit: Boolean,

  canEmail: Boolean,

});

 

const Manager = mongoose.model('ManagerTable', managerSchema);

 

module.exports = Manager;