var express = require('express');
const { createUser } = require('../controllers/userController');
const { createContact, showContact, deleteContact, contactlist, dashboard } = require('../controllers/contactController');
const contact = require('../models/contactModel');
const storage = require('node-persist');
storage.init();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/dashboard', dashboard);
// router.get('/contactlist', function(req, res, next) {
//   res.render('contactlist');
// });
router.get("/contactlist", contactlist);
router.get('/showContact', async (req, res) => {
  const userId = await storage.getItem('userId');
  const contacts = await contact.find({userId});
  return res.render('showContact2', {contacts : contacts});
});

router.post('/createUser', createUser);
router.post('/createContact', createContact);
router.delete('/deleteContact', deleteContact);
// router.get('/showContact', showContact);

module.exports = router;
