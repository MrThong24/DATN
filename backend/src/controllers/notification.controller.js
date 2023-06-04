const mongoose = require('mongoose');
const { Notification } = require('../models');

// const httpStatus = require('http-status');

const asyncHandler = require('express-async-handler');

const createNotification = asyncHandler(async (req, res) => {
  const { id_project, list_user } = req.body;
  const notification = await Notification.create({ id_project, list_user });
  if (notification) {
    res.status(201).json({
      status: 200,
      data: {
        ...notification._doc,
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid project data');
  }
});

const getNotificationByUser = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ 'list_user.id_user': req.params.id_user }).populate('id_project');
  if (notifications) {
    res.status(201).json({
      status: 200,
      data: notifications,
    });
  } else {
    res.status(400);
    throw new Error('Invalid project data');
  }
});

const updateNotificationReadStatus = asyncHandler(async (req, res) => {
  const { id_project, id_user } = req.body;
  const notification = await Notification.findOneAndUpdate(
    {
      id_project: id_project,
      'list_user.id_user': id_user,
    },
    { $set: { 'list_user.$.status_notification': true } },
    { new: true }
  );

  if (notification) {
    res.status(200).json({
      status: 200,
      data: notification,
    });
  } else {
    res.status(404);
    throw new Error('Notification not found');
  }
});

module.exports = {
  createNotification,
  getNotificationByUser,
  updateNotificationReadStatus,
};
