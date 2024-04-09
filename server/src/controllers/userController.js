const User = require('../models/User')

exports.getSelf = async (req, res) => {
    try{
        const user = await User.findOne(req.user.userId)
        if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
    }catch(error){
        console.error('Error getting user', error)
        res.status(500).json({message: 'Internal server error'})
    }
}