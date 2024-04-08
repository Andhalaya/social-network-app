const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId:{
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
    codeSnipet: {
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
}, {timeStamps: true})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;