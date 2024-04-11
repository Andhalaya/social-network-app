const User = require('../models/User')

exports.getUsers = async (req, res) => {
    try{
        const users = await User.find()
        res.status(201).json(users)
    } catch(error) {
        console.error('Error getting users', error);
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
