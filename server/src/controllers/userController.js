const User = require('../models/User');
const Post = require('../models/Post')

exports.getUsers = async (req, res) => {
    try{
        const users = await User.find().populate('posts')
        res.status(201).json(users)
    } catch(error) {
        console.error('Error getting users', error);
        res.status(500).json({message: 'Internal server error'})
    }
}

exports.getUserById = async (req, res) => {
    try{
        const user = await User.findOne({_id: req.params.userId}).populate('posts').populate('projects')
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);

    }catch(error){
        console.error('Error getting user', error);
        res.status(500).json({message: 'Internal server error'})
    }
}

exports.getSelf = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ user });
    } catch(error) {
        console.error('Error getting user', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.deleteUser = async (req, res) => {
    try {
       
        const user = await User.findOneAndDelete({ _id: req.user });
        if (!user) return res.status(404).json({ message: "User not found" });

        await Post.deleteMany({ user: user._id });

        res.json("User and associated posts successfully deleted");
    } catch (error) {
        console.error('Error deleting user and posts', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.editProfile = async (req, res) => {
    try{
        const {fullName, email, userName, location, occupation, gitHub} = req.body
        if (!fullName || !email) {
            return res.status(400).json({ message: "Full name and email are required fields" });
        }
        const user = await User.findOneAndUpdate(
            {_id: req.body.id}, 
            {fullName, email, userName, location, occupation, gitHub },
            { new: true })
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    }catch(error){
        console.error('Error updating user', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.follow = async (req, res) => {
    try {
        const friendId = req.params.id;
        const currentUserId = req.user._id; 

        if (!friendId) {
            return res.status(400).json({ message: "Friend ID is required" });
        }

        const user = await User.findOne(currentUserId);

        if (!user) {
            return res.status(404).json({ message: "Current user not found" });
        }

        const isFollowing = user.friends.includes(friendId);

        if (isFollowing) {
            user.friends = user.friends.filter(id => id !== friendId);
        } else {
            user.friends.push(friendId);
        }

        await user.save();

        res.json({ message: isFollowing ? "Unfollowed successfully" : "Followed successfully", user: user });
    } catch (error) {
        console.error('Error toggling follow:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



