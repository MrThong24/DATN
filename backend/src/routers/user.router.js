const express = require('express');
const {
  createUser,
  authUser,
  getUserProfile,
  getUsersAdmin,
  getUsersCustomer,
  deleteUser,
  getUserById,
  updateUser,
} = require('../controllers/user.controller');
const upload = require('../middleware/uploadFile');
const router = express.Router();

router.post('/create', upload.single('image'), createUser);
router.post('/login', authUser);
router.get('/profile', getUserProfile);
router.get('/admin', getUsersAdmin);
router.put('/delete/:id', deleteUser);
router.get('/all', getUsersCustomer);
router.put('/:id', upload.single('image'), updateUser);
router.get('/:id', getUserById);
module.exports = router;
