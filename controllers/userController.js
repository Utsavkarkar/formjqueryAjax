const user = require('../models/userModel');
const storage = require('node-persist');
storage.init();

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) return res.json({msg: 'Please enter all fields'});
    if(password.length < 6) return res.json({msg: 'Password must be at least 6 characters'});
    
    const emailExist = await user.findOne({email});
    if(emailExist) return res.json({msg: 'Email already exists'});

    const newUser = new user({ name, email, password });

    await storage.setItem('userId', newUser._id);
    await newUser.save();
    return res.json({msg: 'User created'});
}
    
    // await user.create({ name, email, password });
    // return res.json({msg: 'User created'}); 
// }