const express = require('express');
const {
  createNotification,
  getNotificationByUser,
  updateNotificationReadStatus,
} = require('../controllers/notification.controller');
const upload = require('../middleware/uploadFile');
const router = express.Router();

router.post('/create', createNotification);
router.get('/get-notification-by-user/:id_user', getNotificationByUser);
router.put('/update-notification-by-user', updateNotificationReadStatus);

module.exports = router;
