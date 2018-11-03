const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
//const keys = require('./keys');
const User = require('../models/user-models');

passport.serializeUser((user, done)=>{
  //user is passed to this funtion from done(null, currentUser) below
  done(null, user.id);
});


passport.deserializeUser((id, done)=>{
  User.findById(id).then((user)=>{
    done(null, user);
  });
});


passport.use(
  new FacebookStrategy({
     //options for the facebook strat
     callbackURL:'/auth/facebook/redirect',
     clientID:process.env.FACEBOOK_APP_ID,
     clientSecret:process.env.FACEBOOK_APP_SECRET,
     profileFields: ['id', 'displayName', 'picture.width(200).height(200)']
  }, (accessToken, refreshToken, profile, done) => {
    //console.log(profile);
    //passport callback function
    //check if user already exists in database
    User.findOne({googleId:profile.id}).then((currentUser)=>{
     // console.log(profile);
      if(currentUser){
        //already have the user
        //console.log('user is:' + currentUser);
        done(null, currentUser);
      }else {
        //console.log(profile);
        //if not create user in our db
        new User({
          username:profile.displayName,
          googleId:profile.id,
          thumbnail:profile.photos[0].value      
        }).save().then((newUser) => {
          //console.log('new user created:' + newUser);
          done(null, newUser);
        });
      }
    });
  })
);

