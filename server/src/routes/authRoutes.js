const express = require('express');
const router = express.Router();
const {generateToken, verifyToken} = require('../middlewares/authMiddleware')
const {registerUser} = require('../controllers/authController')

router.get('/register', registerUser )

module.exports = router;