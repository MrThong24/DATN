const mongoose = require('mongoose');
const { Project } = require('../models');

// const httpStatus = require('http-status');

const asyncHandler = require('express-async-handler');

const createProject = asyncHandler(async (req, res) => {
  const {
    name_project,
    manager_project,
    place_project,
    department_project,
    worker_project,
    reason_project,
    image,
  } = req.body;

  const files = req.files['image'];

  console.log(files);
  const newListImg = [];
  if (files) {
    files.forEach((element, index) => {
      console.log(element);
      newListImg.push({
        // uid: element.uid,
        src: element.filename,
      });
    });
  }

  const project = await Project.create({
    name_project,
    manager_project,
    place_project,
    department_project,
    worker_project,
    reason_project,
    image: newListImg,
  });

  if (project) {
    res.status(201).json({
      status: 200,
      data: {
        ...project._doc,
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid project data');
  }
});

module.exports = {
  createProject,
};
