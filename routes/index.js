var express = require('express');
var router = express.Router();
var mongo = require('./mongo');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signIn', function(req, res, next) {
	res.render('signIn', { title: 'signIn' });
});

router.get('/homepage', function(req, res, next) {
	res.render('homepage', { title: 'homepage' });
});

router.post('/checkLogin', function(req,res,next) {

	var username = req.body.username;
	var password = req.body.password;
	
	mongo.connect('mongodb://localhost:27017/LoginApp_MongoDB', function(db) {
		var user = db.collection('user-profile').findOne({
			"username"	:	username
		},function(err,result) {
			if(password === result.password) {
				console.log("Username and password are valid");
				req.session.username = result.username;
				req.session.email	=	result.email;
				req.session.fname	=	result.fname;
				req.session.lname	=	result.lname;
				res.send({
					"status_code"	:	200
				});
			} else {
				res.send({
					"status_code"	:	500
				});
			}
		});		
	});
});

router.post('/register', function(req,res,next) {

	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var fname = req.body.fname;
	var lname = req.body.lname;
	
	mongo.connect('mongodb://localhost:27017/LoginApp_MongoDB', function(db) {
		var collection = db.collection('user-profile');
		
		collection.insert( {
			"username"	:	req.body.username,
			"password"	:	req.body.password,
			"email"		:	req.body.email,
			"fname"		:	req.body.fname,
			"lname"		:	req.body.lname	
		},function(err,result) {
			if(!err) {
				console.log("Inserted user data successfully in user-profile collections");
				res.send({
					"status_code"	:	200
				});
			} else {
				res.send({
					"status_code"	:	500
				});
			}
		});
	});
});

router.post('/homepage', function(req,res,next) {
	res.send({
		"username"	:	req.session.username,
		"email"		:	req.session.email,
		"fname"		:	req.session.fname,
		"lname"		:	req.session.lname
	});
});

module.exports = router;
