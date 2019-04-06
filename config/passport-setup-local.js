const localStrategy = require('passport-local').Strategy;
const User = require('../models/user-local-model');
let passport = require('passport');

//module.exports = function(passport){     

    //adds user to session
    //done is a verified callback
    passport.serializeUser(function(user, done){
        done(null, user);
    })
    //removes user from session
   
    passport.deserializeUser(function(user, done){
        done(null, user);
    })

    passport.use(new localStrategy(function(username,password,done){
        User.findOne( {username:username}, function(err,user){
            if(err){
              done(err)
            }else{
                //if username exists
                if (user){
                   //checks if password is valid by comparing to existing user password
                  var valid = user.comparePassword(password, user.password);
                  if(valid){
                                        
                      //allows login
                  
                     done(null, {
                          username:user.username,
                          password:user.password,
                          thumbnail:user.thumbnail,
                          id:user.id
                      });
                     
                  }else{
                    //no login
                    done(null, false, {message: 'wrong password'});
                    
                  }
               }else {
                  //no login                 
                  done(null, false, {message: 'user does not exist'});
               }
            }
        })
    }))
//}

