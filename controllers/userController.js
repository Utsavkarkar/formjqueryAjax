const user = require('../models/userModel');
const jwt = require('jsonwebtoken');
const storage = require('node-persist');
storage.init();

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }
    if (password.length < 6) {
        return res.status(400).json({msg: 'Password must be at least 6 characters'});
    }
    const emailExist = await user.findOne({ email });
    if (emailExist) {
        return res.status(400).json({msg: 'Email already exists'});
    }
    const newUser = new user({ name, email, password });
    try {
        // Save the new user 
        await newUser.save();
        // Generate JWT token
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'test', { expiresIn: '1h' });
        // Set JWT token as a cookie
        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.status(201).json({ msg: 'User created' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

    
    // await user.create({ name, email, password });
    // return res.json({msg: 'User created'}); 
// }