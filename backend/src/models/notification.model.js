const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const notificationSchema = mongoose.Schema(
  {
    id_project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project',
    },

    list_user: [
      {
        id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        status_notification: { type: Boolean, default: false },
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Notification = mongoose.model('notification', notificationSchema);

module.exports = Notification;
