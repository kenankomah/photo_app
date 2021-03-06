const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
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
  new GoogleStrategy({
     //options for the google strat
     callbackURL:'/auth/google/redirect',
     clientID:process.env.clientID,
     clientSecret:process.env.clientSecret,
     userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
  }, (accessToken, refreshToken, profile, done) => {
    //passport callback function
    //check if user already exists in database
    User.findOne({userId:profile.id}).then((currentUser)=>{
      if(currentUser){
        //already have the user
        done(null, currentUser);
      }else {
        //if not create user in our db
        console.log(profile);
        new User({
          username:profile.displayName,
          userId:profile.id,
          thumbnail:profile._json.picture
        }).save().then((newUser) => {
          console.log('new user created:' + newUser);
          done(null, newUser);
        });
      }
    });
  })
);
