const mongoose = require('mongoose');
const { Overtime } = require('../models');
const { User } = require('../models');
// const httpStatus = require('http-status');

const asyncHandler = require('express-async-handler');

const createOvertime = asyncHandler(async (req, res) => {
  const { name_employee, registration_date, phone, name_project, date_start, date_end, content } = req.body;
  const overtime = await Overtime.create({
    name_employee,
    registration_date,
    phone,
    name_project,
    date_start,
    date_end,
    content,
  });

  // If the user is successfully created then send back user details in response
  if (overtime) {
    res.status(201).json({
      status: 200,
      data: {
        name_employee: name_employee, // Chú ý đến cú pháp này
        registration_date,
        phone,
        name_project,
        date_start,
        date_end,
        content,
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid overtime data');
  }
});

const getAllOvertime = asyncHandler(async (req, res) => {
  const overtimes = await Overtime.find().populate({
    path: 'name_employee', // Trường tham chiếu đến bảng user trong model Overtime
    select: 'name_employee account_employee', // Trường cần lấy từ bảng user
    model: User, // Model để tham chiếu
  });
  if (overtimes) {
    res.status(200).json({
      status: 200,
      data: {
        overtimes,
      },
    });
  } else {
    res.status(404);
    throw new Error('No overtime found');
  }
});

const getOvertimeById = asyncHandler(async (req, res) => {
  const overtime = await Overtime.findById(req.params.id).populate({
    path: 'name_employee', // Trường tham chiếu đến bảng user trong model Overtime
    select: 'name_employee', // Trường cần lấy từ bảng user
    model: User, // Model để tham chiếu
  });
  if (overtime) {
    res.status(200).json({
      status: 200,
      data: {
        overtime,
      },
    });
  } else {
    res.status(404);
    throw new Error('Overtime not found');
  }
});

const updateOvertime = asyncHandler(async (req, res) => {
  const overtime = await Overtime.findById(req.params.id);
  if (overtime) {
    overtime.name_employee = req.body.name_employee || overtime.name_employee;
    overtime.registration_date = req.body.registration_date || overtime.registration_date;
    overtime.phone = req.body.phone || overtime.phone;
    overtime.name_project = req.body.name_project || overtime.name_project;
    overtime.date_start = req.body.date_start || overtime.date_start;
    overtime.date_end = req.body.date_end || overtime.date_end;
    overtime.content = req.body.content || overtime.content;
    overtime.isActive = req.body.isActive || overtime.usActive;
    const updatedOvertime = await overtime.save();

    res.status(200).json({
      status: 200,
      data: {
        name_employee: updatedOvertime.name_employee,
        registration_date: updatedOvertime.registration_date,
        phone: updatedOvertime.phone,
        name_project: updatedOvertime.name_project,
        date_start: updatedOvertime.date_start,
        date_end: updatedOvertime.date_end,
        content: updatedOvertime.content,
        isActive: updatedOvertime.isActive,
      },
    });
  } else {
    res.status(404);
    throw new Error('Overtime not found');
  }
});

const deleteOvertime = asyncHandler(async (req, res) => {
  const overtime = await Overtime.findById(req.params.id);
  if (overtime) {
    await overtime.remove();
    res.status(200).json({
      status: 200,
      message: 'Overtime deleted successfully',
    });
  } else {
    res.status(404);
    throw new Error('Overtime not found');
  }
});

module.exports = {
  createOvertime,
  getAllOvertime,
  updateOvertime,
  getOvertimeById,
  deleteOvertime,
};
