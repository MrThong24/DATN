const mongoose = require('mongoose');
const { User } = require('../models');
const generateToken = require('../utils/generateToken.js');
// const httpStatus = require('http-status');

const asyncHandler = require('express-async-handler');

const authUser = asyncHandler(async (req, res) => {
  const { account_employee, password_employee } = req.body;
  const user = await User.findOne({ account_employee });

  // If the user exists and the password_employee matches the one store return the details with JSON web token signature
  if (user && (await user.matchPassword(password_employee))) {
    res.json({
      status: 200,
      data: {
        _id: user._id,
        name_employee: user.name_employee,
        account_employee: user.account_employee,
        image: user.image,
        isAdmin: user.isAdmin,
        status: user.status,
        position_employee: user.position_employee,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(401);
    res.json({
      status: 401,
      error: {
        message: 'Invalid email or password_employee',
      },
    });
    // throw new Error('Invalid email or password_employee');
  }
});
const createUser = asyncHandler(async (req, res) => {
  const {
    password_employee,
    account_employee,
    name_employee,
    code_employee,
    address_employee,
    department_employee,
    gender_employee,
    position_employee,
    cmnd_employee,
    status,
    phone_employee,
    current_residence,
    date_of_birth,
    wage_employee,
    isAdmin,
  } = req.body;
  const files = req.file && req.file.filename;
  const userExists = await User.findOne({ account_employee });
  if (userExists) {
    res.status(201).json({
      status: 400,
      data: {
        account_employee: 'Id employee already exists.',
      },
    });
  }
  // Create a new userJSON.parse()
  const user = await User.create({
    name_employee,
    account_employee,
    gender_employee,
    code_employee,
    address_employee,
    password_employee,
    department_employee,
    position_employee,
    status,
    cmnd_employee,
    phone_employee,
    current_residence,
    date_of_birth,
    image: files,
    wage_employee,
    isAdmin,
  });

  // If the user is successfully created then send back user details in response
  if (user) {
    res.status(201).json({
      status: 200,
      data: {
        ...user,
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name_employee: user.name_employee,
      account_employee: user.account_employee,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
const getUsersAdmin = asyncHandler(async (req, res) => {
  const userAdmin = await User.find({ isAdmin: true });

  if (userAdmin) {
    res.json({
      data: userAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
const getUsersCustomer = asyncHandler(async (req, res) => {
  const userCustomer = await User.find({ isAdmin: false });

  if (userCustomer) {
    const reversedUserCustomer = userCustomer.reverse();
    res.json({
      data: reversedUserCustomer,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id }, { status: 2 });

  if (user) {
    res.json({
      message: 'User deleted successfully',
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name_employee = req.body.name_employee || user.name_employee;
    user.account_employee = req.body.account_employee || user.account_employee;

    user.code_employee = req.body.code_employee || user.code_employee;
    user.address_employee = req.body.address_employee || user.address_employee;
    user.department_employee = req.body.department_employee || user.department_employee;
    user.position_employee = req.body.position_employee || user.position_employee;
    user.gender_employee = req.body.gender_employee || user.gender_employee;
    user.cmnd_employee = req.body.cmnd_employee || user.cmnd_employee;
    user.phone_employee = req.body.phone_employee || user.phone_employee;
    user.current_residence = req.body.current_residence || user.current_residence;
    user.date_of_birth = req.body.date_of_birth || user.date_of_birth;
    user.wage_employee = req.body.wage_employee || user.wage_employee;
    user.status = req.body.status || user.status;

    user.password_employee = req.body.password_employee || user.password_employee;

    if (req.file) {
      user.image = req.file.filename;
    }

    const updatedUser = await user.save();
    res.json({
      status: 200,
      data: {
        _id: updatedUser._id,
        password_employee: updatedUser.password_employee,
        account_employee: updatedUser.account_employee,
        name_employee: updatedUser.name_employee,
        status: updatedUser.status,
        code_employee: updatedUser.code_employee,
        address_employee: updatedUser.address_employee,
        department_employee: updatedUser.department_employee,
        gender_employee: updatedUser.gender_employee,
        position_employee: updatedUser.position_employee,
        cmnd_employee: updatedUser.cmnd_employee,
        phone_employee: updatedUser.phone_employee,
        current_residence: updatedUser.current_residence,
        date_of_birth: updatedUser.date_of_birth,
        wage_employee: updatedUser.wage_employee,
        token: generateToken(updatedUser._id),
        image: updatedUser.image,
      },
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  createUser,
  authUser,
  getUsersAdmin,
  getUserProfile,
  getUsersCustomer,
  deleteUser,
  getUserById,
  updateUser,
};
