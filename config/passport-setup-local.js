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
       
        User.findOne({username:username}, function(err,doc){
            if(err){
              done(err)
            }else{
                //if username exists
                if (doc){
                   //checks if password is valid by comparing to existing user password
                   console.log("step33333333333333333333333333333333");
                  var valid = doc.comparePassword(password, doc.password);
                  if(valid){
                    console.log("step4444444444444444444444444444444");
                     
                      //allows login
                    
                     done(null, {
                          username:doc.username,
                          password:doc.password,
                          thumbnail:doc.thumbnail,
                          id:doc.id
                      });
                      //done(null, doc);
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

