const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Register a new User (SEND POST Method)
router.post("/register", async (req, res) => {
  try {
    // Generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save user and response
    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login to an existing User
router.post("/login", async (req, res) => {
  try {
    // Find the user
    const user = await User.findOne({username:req.body.username});
    !user && res.status(400).json("Wrong username or password!");

    // Validate password
    const validPassword = await bcrypt.compare(
        req.body.password, 
        user.password
    );
    !validPassword && res.status(400).json("Wrong username or password!");

    // Send result
    res.status(200).json({_id:user._id, username: user.username});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;