const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema(
  {
    account_employee: {
      type: String,
    },
    password_employee: {
      type: String,
    },
    name_employee: {
      type: String,
    },
    code_employee: {
      type: String,
    },
    address_employee: {
      type: String,
    },
    department_employee: {
      type: String,
    },
    position_employee: {
      type: String,
    },
    cmnd_employee: {
      type: Number,
    },
    phone_employee: {
      type: Number,
    },
    gender_employee: {
      type: String,
    },
    current_residence: {
      type: String,
    },
    date_of_birth: {
      type: Date,
    },
    image: {
      type: String,
    },
    wage_employee: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password_employee);
};

// Before saving the password_employee into the DB encrypt and hash the password_employee
userSchema.pre('save', async function (next) {
  // If the password_employee has not been modified then just move on else just hash the password_employee
  if (!this.isModified('password_employee')) {
    next();
  }

  // Generate a salt with 10 rounds
  const salt = await bcrypt.genSalt(10);
  // Encrypt and hash password_employee
  this.password_employee = await bcrypt.hash(this.password_employee, salt);
});

const User = mongoose.model('user', userSchema);

module.exports = User;
