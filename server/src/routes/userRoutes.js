const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/authMiddleware')
const { getSelf, getUsers, deleteUser, editProfile, getUserById, follow } = require('../controllers/userController');

router.get('/', verifyToken, getUsers);
router.get('/me',verifyToken, getSelf );
router.delete('/me', verifyToken, deleteUser);
router.patch('/profile', verifyToken, editProfile);
router.patch('/follow/:id',verifyToken, follow);
router.get('/:userId', getUserById)

module.exports = router