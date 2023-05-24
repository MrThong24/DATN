const mongoose = require('mongoose');
const { Project, User, Department } = require('../models');

const asyncHandler = require('express-async-handler');

const createProject = asyncHandler(async (req, res) => {
  const {
    name_project,
    manager_project,
    place_project,
    department_project,
    worker_project,
    date_start,
    date_end,
    status,
    statusOvertime,
    reason_project,
  } = req.body;

  const project = await Project.create({
    name_project,
    manager_project,
    place_project,
    department_project,
    worker_project,
    date_start,
    status,
    date_end,
    reason_project,
    statusOvertime,
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

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find()
    .populate({
      path: 'manager_project', // Trường tham chiếu đến bảng user trong model Overtime
      select: 'name_employee', // Trường cần lấy từ bảng user
      model: User, // Model để tham chiếu
    })
    .populate({
      path: 'worker_project',
      select: 'name_employee',
      model: User,
    })
    .populate({
      path: 'department_project',
      select: 'name',
      model: Department,
    });

  res.status(200).json({
    status: 200,
    data: projects,
  });
});

const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id)
    .populate({
      path: 'manager_project',
      select: 'name_employee image department_employee',
      model: User,
    })
    .populate({
      path: 'worker_project',
      select: 'name_employee image department_employee',
      model: User,
    })
    .populate({
      path: 'department_project',
      select: 'name',
      model: Department,
    });

  if (project) {
    res.status(200).json({
      status: 200,
      data: project,
    });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name_project,
    manager_project,
    place_project,
    department_project,
    date_end,
    date_start,
    worker_project,
    status,
    statusOvertime,
    reason_project,
  } = req.body;

  const project = await Project.findById(id);

  if (project) {
    project.name_project = name_project;
    project.manager_project = manager_project;
    project.place_project = place_project;
    project.department_project = department_project;
    project.worker_project = worker_project;
    project.status = status;
    project.date_end = date_end;
    project.date_start = date_start;
    project.statusOvertime = statusOvertime;
    project.reason_project = reason_project;

    const updatedProject = await project.save();

    res.status(200).json({
      status: 200,
      data: updatedProject,
    });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});
module.exports = {
  createProject,
  getAllProjects,
  updateProject,
  getProjectById,
};
