const express = require('express');
const { createOvertime } = require('../controllers/overtime.controller');

const router = express.Router();

router.post('/', createOvertime);
// router.get('/', getDepartment);
// router.put('/:id', updateDepartmentById);
// router.delete('/delete/:id', deleteDepartmentById);
// router.get('/:id', getDepartmentById);

module.exports = router;
