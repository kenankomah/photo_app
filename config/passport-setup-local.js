const localStrategy = require('passport-local').Strategy;
const User = require('../models/user-local-model');
const passport = require('passport');

//console.log(User);

//module.exports = function(passport){
    console.log("step000000000000000000000000000000");
    console.log(passport.serializeUser);

    //adds user to session
    //done is a verified callback
    passport.serializeUser(function(user, done){
        //console.log(user);
        console.log("serializeUserserializeUserserializeUser");
        done(null, user);
    })
    //removes user from session
    passport.deserializeUser(function(user, done){
        console.log("deserializeUserdeserializeUserdeserializeUser");
        done(null, user);
    })

    passport.use(new localStrategy(function(username,password,done){
        console.log("step111111111111111111111111111111");
        User.findOne({username:username}, function(err,doc){
            if(err){
              done(err)
            }else{
                //if username exists
                console.log("step22222222222222222222222222222222");
               if (doc){
                   //checks if password is valid by comparing to existing user password
                   console.log("step33333333333333333333333333333333");
                  var valid = doc.comparePassword(password, doc.password);
                  if(valid){
                    console.log("step4444444444444444444444444444444");
                     
                      //allows login
                    
                     // userId(doc.id)
                      done(null, {
                          username:doc.username,
                          password:doc.password,
                          id:doc.id
                      });
                  }else{
                    //no login
                    done(null, false);
                  }
               }else {
                  //no login
                  done(null, false);
               }
            }
        })
    }))
//}