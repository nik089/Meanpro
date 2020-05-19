let mongoose = require('mongoose');
//create schema (structure)
let adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

//model
module.exports = mongoose.model('admin', adminSchema);
//end