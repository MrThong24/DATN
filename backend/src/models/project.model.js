const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const projectSchema = mongoose.Schema(
  {
    name_project: {
      type: String,
      require: true,
    },
    manager_project: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    place_project: {
      type: String,
    },
    department_project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'department',
    },
    worker_project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    reason_project: {
      type: String,
    },
    image: [{ src: { type: String } }],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('project', projectSchema);

module.exports = Project;
