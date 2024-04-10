const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    picturePath: {
        type: String
    },
    codeSnippet: {
        type: String
    },
    link: {
        type: String
    },
    likes: {
        type: Map,
        of: Boolean,
    },
    comments:{
        type: Array,
        default: []
    } 
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;