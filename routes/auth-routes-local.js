var express = require('express');
const app = express();
var router = express.Router();
const User = require('../models/user-local-model');

//console.log(User);


//when a user makes a post request to the sign up they will be added to the data base
module.exports = function(passport){
     //console.log(passport);
    router.post('/signup', function(req, res) {
        console.log("hellooooooooooooooooooooooooooooooooo");

        var body = req.body,
            username = body.username,
            password = body.password; 
        User.findOne({username:username}, function(err, user){
            if(err) {res.status(500).send('error occured!')}
            else{
                if(user){
                    res.status(500).send('Username already exists')
                }else{
                    var record = new User(); 
                    record.username = username;
                    record.password = record.hashPassword(password); 
                    record.thumbnail = "https://safe-ocean-51888.herokuapp.com/assets/default_profile.png";
                    record.save(function(err, user){
                        if(err){
                            res.status(500).send('db error');
                        }else{
                            //console.log(user);
                            res.send(user) 
                        }
                    })                 
                }
            }
        })
    });

    router.post('/login', passport.authenticate('local',{
        failureRedirect:'/',
        successRedirect:'/',
        failureFlash: true 
    }))/*, function(req, res){
        //res.send('hey')
        req.session.save(function(){
            res.redirect('/welcome');
            res.send('test string');
        });
    })*/

    return router;
};
