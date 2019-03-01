const localStrategy = require('passport-local').Strategy;
const User = require('../models/user-local-model');

//console.log(User);

module.exports = function(passport){
   // console.log(localStrategy);

    //adds user to session
    //done is a verified callback
    passport.serializeUser(function(user, done){
        //console.log(user);
        console.log("localStrategylocalStrategylocalStrategy");
        done(null, user);
    })
    //removes user from session
    passport.deserializeUser(function(user, done){
        done(null, user);
    })

    passport.use(new localStrategy(function(username,password,done){
        console.log("localStrategylocalStrategylocalStrategy");
        User.findOne({username:username}, function(err,doc){
            if(err){
              done(err)
            }else{
                //if username exists
               if (doc){
                   //checks if password is valid by comparing to existing user password
                  var valid = doc.comparePassword(password, doc.password);
                  if(valid){
                      //allows login
                      //console.log(doc);
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
}