const contact = require('../models/contactModel');
const storage = require('node-persist');
storage.init();

exports.createContact = async (req, res) => {
    const { name, coNumber} = req.body;
    const userId = await storage.getItem('userId');
    if(!name || !coNumber) return res.json({msg: 'Please enter all fields'});
    // if(coNumber.length < 10) return res.json({msg: 'Phone number must be at least 10 characters'});

    await contact.create({ name, coNumber, userId });
    return res.json({msg: 'Contact created'}); 
}

exports.deleteContact = async (req, res) => {
    const id = req.query.id;
    await contact.findByIdAndDelete(id);
    return res.json({msg: 'Contact deleted'}); 
}