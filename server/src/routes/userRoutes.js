const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/authMiddleware')
const { getSelf, getUsers } = require('../controllers/userController');

router.get('/', verifyToken, getUsers)
router.get('/me',verifyToken, getSelf )

module.exports = router