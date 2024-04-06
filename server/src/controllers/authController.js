const User = require('../models/User')

exports.registerUser = async (req, res) => {
    const { fullName, userName, email, password } = req.body;
    try{
        let user = await User.findOne({email})

        if(user) {
            return res.status(400).json({message: 'user already exists'});
        }

        const newUser = new User({
            fullName,
            userName,
            email, 
            password
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch(error){
        console.error('Failed to create new user:', error);
    }

}

