const express = require('express');
const { createProject } = require('../controllers/project.controller');
const upload = require('../middleware/uploadFile');
const router = express.Router();

router.post('/create', upload.fields([{ name: 'image', maxCount: 4 }]), createProject);

module.exports = router;
