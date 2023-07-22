const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Add a custom validator to check for the "@" symbol in the email field
    validate: {
      validator: function (value) {
        return /\S+@\S+\.\S+/.test(value);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    // Add a custom validator to check for a minimum length of 8 characters and a combination of lowercase letters, uppercase letters, and numbers.
    validate: {
      validator: function (value) {
        // Regex to check for at least one lowercase letter, one uppercase letter, one number, and a minimum length of 8 characters.
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
      },
      message: "Password must be at least 8 characters long.",
    },
  },
  profilePic: {
    data: Buffer,
    contentType: String,
  },
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
