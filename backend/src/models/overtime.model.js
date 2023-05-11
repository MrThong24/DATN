const mongoose = require('mongoose');

const overtimeSchema = mongoose.Schema(
  {
    name_employee: {
      type: String,
    },
    registration_date: {
      type: Date,
      default: Date.now,
    },
    phone: {
      type: Number,
    },
    name_project: {
      type: String,
    },
    date_start: {
      type: Date,
    },
    date_end: {
      type: Date,
    },
    content: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Overtime = mongoose.model('overtime', overtimeSchema);

module.exports = Overtime;
