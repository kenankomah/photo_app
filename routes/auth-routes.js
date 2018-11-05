const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res) =>{
  res.render('login',{user:req.user});
});

//auth logout
router.get('/logout', (req, res)=>{
  console.log({user:req.user});
  //handle with passport
  req.logout();
  res.redirect('/');
});




// auth with google
router.get('/google', passport.authenticate('google',{
  scope:['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'),(req, res) => {
   res.redirect('/');
});





// auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

// callback route for google to redirect to
router.get('/facebook/redirect', passport.authenticate('facebook'),(req, res) => {
   res.redirect('/');
});




// auth with twitter
router.get('/twitter', passport.authenticate('twitter'));

// callback route for twitter to redirect to
router.get('/twitter/redirect', passport.authenticate('twitter'),(req, res) => {
   res.redirect('/');
});



// auth with GitHub
router.get('/github', passport.authenticate('github'));

// callback route for GitHub to redirect to
router.get('/github/redirect', passport.authenticate('github'),(req, res) => {
   res.redirect('/');
});






module.exports = router;

