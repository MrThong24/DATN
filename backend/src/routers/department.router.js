const express = require('express');
const {
  createDepartment,
  deleteDepartmentById,
  getDepartmentById,
  getDepartment,
  updateDepartmentById,
} = require('../controllers/department.controller');

const router = express.Router();

router.post('/', createDepartment);
router.get('/', getDepartment);
router.put('/:id', updateDepartmentById);
router.delete('/delete/:id', deleteDepartmentById);
router.get('/:id', getDepartmentById);

module.exports = router;
