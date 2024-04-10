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

exports.createPost = async (req, res) => {
    try{
        
        const newPost = new Post({ 
            userId: req.params._id,
            title: req.body.title, 
            description: req.body.description, 
            picturePath: req.body.picturePath, 
            codeSnipet: req.body.codeSnipet, 
            link: req.body.link
        })
        await newPost.save();
        res.status(201).json({newPost: newPost})
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
}