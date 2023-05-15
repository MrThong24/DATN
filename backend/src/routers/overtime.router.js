const express = require('express');
const {
  createOvertime,
  getAllOvertime,
  getOvertimeById,
  updateOvertime,
  deleteOvertime,
} = require('../controllers/overtime.controller');

const router = express.Router();

router.post('/create', createOvertime);

router.get('/all', getAllOvertime);

router.get('/:id', getOvertimeById);

router.put('/:id', updateOvertime);

router.delete('/:id', deleteOvertime);

module.exports = router;
