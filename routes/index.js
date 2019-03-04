var express = require('express');
var router = express.Router();
//var UserId = require('./index');

var loggedin = function(req, res, next){
    console.log('isAuthenticated');
  //returns a boolean, true if logged in and false if not
  if(req.isAuthenticated()){
    console.log('isAuthenticated');
    next();
  }else{
    res.redirect('/login'); 
    console.log('isNotAuthenticated');
  }
}
console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

router.get('/login', function(req, res, next) {
 console.log('loginloginlogin');
 // res.render('login');
});

router.get('/signup', function(req, res, next) {
 // res.render('signup');
});

router.get('/profile',loggedin, function(req, res, next) {
    console.log("profileprofileprofileprofile");

  var ts = Date.now() + 24*60*60*1000;
  var exp = new Date(ts).toISOString();
 // req.session.cookie.expires =  exp;
  console.log(req.user);
  res.send(req.session);
});

router.get('/logout', function(req, res){
  req.logout();
  res.send('logged out');
});

module.exports = router;