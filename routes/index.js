var express = require('express');
const { createUser } = require('../controllers/userController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/dashboard', function(req, res, next) {
  res.render('dash');
});

router.post('/createUser', createUser);

module.exports = router;
