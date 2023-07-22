const jwt = require("jsonwebtoken");
const UserModel = require("../Model/User.Model.js");

const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let profilePic = null;
    if (req.file && req.file.buffer && req.file.mimetype) {
      profilePic = {
        data: req.file.buffer, 
        contentType: req.file.mimetype, 
      };
    }

    const user = new UserModel({ name, email, password, profilePic });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("An error occurred while registering the user:", error);
    res.status(500).json({ error: `An error occurred while registering the user: ${error.message}` });
  }
};

const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found. Please register first." });
      }
      const payload = {
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      };
      const secretKey = "your-secret-key";
      const options = {
        expiresIn: "1h" 
      };
      const token = jwt.sign(payload, secretKey, options);
      res.status(200).json({
        message: "Login successful!",
        name: user.name, 
        email: user.email,
        token,
      });
    } catch (error) {
      console.error("An error occurred while logging in:", error);
      res.status(500).json({ error: `An error occurred while logging in: ${error.message}` });
    }
  };



module.exports = {SignUp,Login};
