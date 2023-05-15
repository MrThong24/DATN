const mongoose = require('mongoose');

const overtimeSchema = mongoose.Schema(
  {
    name_employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    registration_date: {
      type: Date,
    },
    phone: {
      type: Number,
    },
    name_project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project',
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
