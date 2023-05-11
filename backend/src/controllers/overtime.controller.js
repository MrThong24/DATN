const mongoose = require('mongoose');
const { Overtime } = require('../models');
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
        ...overtime,
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid overtime data');
  }
});

module.exports = {
  createOvertime,
};
