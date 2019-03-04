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
        User.findOne({username:username}, function(err, doc){
            if(err) {res.status(500).send('error occured!')}
            else{
                if(doc){
                    res.status(500).send('Username already exists')
                }else{
                    var record = new User(); 
                    record.username = username;
                    record.password = record.hashPassword(password); 
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
        successRedirect:'/'
    }), function(req, res){
        res.send('hey')
    })
    return router;
};
