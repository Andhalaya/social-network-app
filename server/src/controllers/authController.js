const { validationResult, body } = require('express-validator');
const User = require('../models/User')
const { hashedSecret } = require('../crypto/config');

exports.registerUser = [
  body("fullName").trim().escape().notEmpty().withMessage("Full name is required."),
  body("userName").trim().escape().notEmpty().matches(/^\S+$/).withMessage("Username must be a single word without spaces").isLength({ min: 3, max: 12 }).withMessage("Username must have between 3 and 12 characters."),
  body("email").trim().escape().isEmail().withMessage("Email is not valid."),
  body("password").trim().escape().isLength({ min: 6 }).withMessage("Password must have at least 6 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/).withMessage("Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, userName } = req.body;
      console.log("About to check for existing user:", email, userName); 
      // Check if user with the same email or username already exists
      const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
      console.log("Existing user result:", existingUser); 
      if (existingUser) {
        return res.status(400).json({ error: 'User with the same email or username already exists.' });
      }

      // Create a new user
      const newUser = new User({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        password: hashedSecret
      });

      // Save the new user
      await newUser.save();

      res.status(201).json({ message: "Successfully registered." });
    } catch (error) {
      console.error('Failed to create new user:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
];


exports.getUsers = async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    } catch(error){
        res.status(500).json({ message: 'Server Error' });
    }
}