const express = require('express');
const router = express.Router();
const {getPosts, createPost} = require('../controllers/PostController')
const {verifyToken} = require('../middlewares/authMiddleware')
const upload = require('../config/multer')

router.get('/', verifyToken,  getPosts )
router.post('/', verifyToken, upload.single('picturePath'), createPost)

module.exports = router;