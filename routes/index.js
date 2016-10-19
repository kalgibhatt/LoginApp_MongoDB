var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signIn', function(req, res, next) {
	res.render('signIn', { title: 'signIn' });
});

router.get('/homepage', function(req, res, next) {
	res.render('homepage', { title: 'Homepage' });
});

router.post('/checkLogin', function(req,res) {

	var username = req.body.username;
	var password = req.body.password;
});

router.post('/register', function(req,res) {

	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var fname = req.body.fname;
	var lname = req.body.lname;
});

module.exports = router;
