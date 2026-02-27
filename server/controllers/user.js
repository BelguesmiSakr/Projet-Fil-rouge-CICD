const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  register: async (req, res) => {
    try {
      let { userName, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "Email already in use" });
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const user = { userName, email, password: hash };
      const regestrideUser = await User.create(user);
      return res.status(201).json({ message: "user created successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    let credantials = req.body;
    try {
      const user = await User.findOne({ email: credantials.email });
      if (!user)
        return res
          .status(409)
          .json({ message: "user not found, incorrect email" });
      const isMatch = await bcrypt.compare(credantials.password, user.password);
      if (!isMatch)
        return res.status(409).json({ message: "Invalid password" });
      const token = jwt.sign(
        { user_id: user._id, email: user.email, userName: user.userName },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "24h" }
      );
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
