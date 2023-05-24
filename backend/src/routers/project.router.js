const express = require('express');
const { createProject, getAllProjects, getProjectById, updateProject } = require('../controllers/project.controller');
const router = express.Router();

router.post('/create', createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);

module.exports = router;
