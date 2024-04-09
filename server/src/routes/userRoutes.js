const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/authMiddleware')
const { getSelf } = require('../controllers/userController');

router.get('/me',verifyToken, getSelf )

module.exports = router