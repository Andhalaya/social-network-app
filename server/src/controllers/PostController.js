const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
    try{
        const posts = await Post.find()
        res.status(200).json(posts)
    }catch(error){
        console.error(error);
        res.status(500).json({message: error.message})
    }
}