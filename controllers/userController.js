const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

// Register new user
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all data'
            })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, email, password: hashedPassword })
        await user.save();
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error in registration',
            error: error.message
        })
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: 'Please provide email or password'
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(200).json({
                success: false,
                message: 'Email is not registered'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        return res.status(200).json({
            success: true,
            message: 'Login successfully',
            user,
            token
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error in login',
            error: error.message
        })
    }
}

module.exports = { registerUser, loginUser }