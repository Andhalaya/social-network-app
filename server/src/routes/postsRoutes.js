const express = require('express');
const router = express.Router();
const {getPosts, createPost} = require('../controllers/PostController')
const {verifyToken} = require('../middlewares/authMiddleware')

router.get('/', verifyToken, getPosts )
router.post('/', verifyToken, createPost)

module.exports = router;