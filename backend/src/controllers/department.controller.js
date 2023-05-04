const mongoose = require('mongoose');
const { Department } = require('../models');
// const httpStatus = require('http-status');

const asyncHandler = require('express-async-handler');

const createDepartment = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const department = await Department.create({
    code,
    name,
  });

  // If the user is successfully created then send back user details in response
  if (department) {
    res.status(201).json({
      status: 200,
      data: {
        ...department,
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid department data');
  }
});

const getDepartmentById = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (department) {
    res.json(department);
  } else {
    res.status(404);
    throw new Error('Department not found');
  }
});

const deleteDepartmentById = asyncHandler(async (req, res) => {
  const department = await Department.deleteOne({ _id: req.params.id });
  if (department) {
    res.json(department);
  } else {
    res.status(404);
    throw new Error('department Not Found');
  }
});

const getDepartment = asyncHandler(async (req, res) => {
  const department = await Department.find({});

  if (department) {
    res.json({
      data: department,
    });
  } else {
    res.status(404);
    throw new Error('department not found');
  }
});

const updateDepartmentById = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (department) {
    // Check which fields were sent in the request else just keep them the same
    department.code = req.body.code || department.code;
    department.name = req.body.name || department.name;

    const categoryUp = await department.save();

    res.status(201).json({
      status: 200,
      data: categoryUp,
    });
  } else {
    res.status(404);
    throw new Error('department not found');
  }
});

module.exports = {
  createDepartment,
  getDepartmentById,
  deleteDepartmentById,
  updateDepartmentById,
  getDepartment,
};
