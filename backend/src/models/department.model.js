const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Department = mongoose.model('department', departmentSchema);

module.exports = Department;
