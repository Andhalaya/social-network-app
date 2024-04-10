const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
    try{
        const posts = await Post.find().populate('user')
        res.status(200).json(posts)
    }catch(error){
        console.error(error);
        res.status(500).json({message: error.message})
    }
}

exports.createPost = async (req, res) => {
    try{
        
        const newPost = new Post({ 
            user: req.body.user,
            title: req.body.title, 
            description: req.body.description, 
            picturePath: req.body.picturePath, 
            codeSnippet: req.body.codeSnippet, 
            link: req.body.link
        })
        await newPost.save();
        res.status(201).json({newPost: newPost})
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
}