const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Image = require('./models/image-model');

const path = require('path');
const fs = require("fs");

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');



const authRoutes = require('./routes/auth-routes');

const passport = require('passport');

const passportSetup_local = require('./config/passport-setup-local');
const passportSetup = require('./config/passport-setup-google');
const passportSetup_twitter = require('./config/passport-setup-twitter');
 const passportSetup_github = require('./config/passport-setup-github');


// app.post('/authent/login', (req, res) =>{
//   console.log("testtesttesttest")
// });

const cookieSession = require('cookie-session');

//console.log(passport); 


//require('./config/passport-setup-local')(passport);
//for passport local
var createError = require('http-errors');//
var session = require('express-session');//
var logger = require('morgan');//

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');


const port = process.env.PORT || 5000; 

const pageNotFound = "<center style='position:relative; top:30%'> <h1 style='font-size:80px;'>404</h1> <p style='font-size:32px;'>Sorry this page cannot be found.</p> <p style='font-size:32px;'>Click <a href='/' style='text-decoration:none;'><span style='color:blue;'>here</span></a> to go to the home page</p> </center>";

mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Origin", "http://localhost:8080"); 
  res.header("Access-Control-Allow-Credentials","true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.header("Access-Control-Allow-Origin", "*");    
  next();
});


app.get('/images/:id',function(req, res){
    console.log('getting one image');
    //req.params.id gives the id that is sent from the front end
    Image.findOne({
        _id:req.params.id
    })
    .exec(function(err, image){
       if(err){
         res.send('error occured') ;
       }else{
          res.json(image);
       }
    })
});

//image update
app.put('/image/:id', function(req, res){
  //console.log(req.body.filter)
   Image.findOneAndUpdate({
     _id:req.params.id
   },
   {$set: {filter:req.body.filter}},
      {upsert:true},
      function(err, newFilter){
        if(err){
          console.log('error occured');
        }else{
          console.log(newFilter);
          res.sendStatus(204);
        }      
    });
});

/**************************************** image upload code ******************************************/


aws.config.update({
  secretAccessKey:process.env.S3_SECRET,
  accessKeyId:process.env.S3_KEY,
  region: 'us-east-2'
});


const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  //Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  //Check extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
      return cb(null, true)
  }else {
      cb('Error: Images Only!');
  }
}

const upload = multer({
  fileFilter,
  limits:{fileSize:8000000},
  storage: multerS3({
    s3,
    bucket: 'image-gallery1',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_META_DATA!'});
    },
    key: function (req, file, cb) {      
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })
}).single('myImage');


app.delete('/image/:id', function(req, res){
   //req.params.id gives the id that is sent from the front end
  Image.findOneAndRemove({
    _id:req.params.id
  },function(err, image){
    if(err){
      res.send('error deleting')
    }else{
      console.log(image.src);
      var key = image.src.split('.com/')[1];

      var params = {
          Bucket: "image-gallery1", 
          Key: key
      };

      s3.deleteObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response      
      });
    }
  });
});



/****************************************************************** OAuth Login system code ****************************************************************************/

// set up view engine


//SECRET MUST BE ADDED TO .ENV!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// app.use(session({
//   secret:'thesecret',
//   saveUninitialized:false,
//   resave: false
// }))



//encrypts cookie and sets it's lifespan
app.use(cookieSession({
  maxAge:24*60*60*1000,
  keys:[process.env.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//set up routes
app.use('/auth', authRoutes);




// request is made for user profile data e.g profile pic and name
app.get('/mongoid', (req, res)=>{
   res.send(req.user);  
});



app.get('/images', (req, res)=>{
  //console.log('test:',req.user);
  Image.find({})
  .exec(function(err, images){
     if(err){
       res.send('error has occured') ;
     }else{
       //filters the images array to only those that have a matching user id    
       if(req.user){
          var userId = req.user.id || req.user._id
          const filteredImages = images.filter((el)=>{            
          return userId == el.mongoId;
        });
         res.json(filteredImages);
       }
     }
  })
});


/*Prevents issue with mime type*/
app.use(express.static('./client/'));  

/*resolve is used as a security feature when navigating the files*/
app.get('/', function (req, res) {
  res.sendfile(path.resolve("./client/index.html"));
});


app.get('/list', (req, res)=>{
  res.redirect('/');
});


app.get('/filters', (req, res)=>{
  res.redirect('/');
});


app.post('/upload', (req, res) =>{
    upload(req, res, (err) => {
      console.log("user_test----",req.user);
       if(err){
           res.send({
               msg: err,
               userId:req.user               
            });
       } else {
            if(req.file === undefined){
              res.send({
                  msg: 'Error: No file selected!',
                  userId:req.user
              });
            }else{
                res.send({
                msg: 'Image uploaded',
                userId:req.user
              });
               // code below adds new image data to mongoose
               const dateTime = new Date();
               const newImage = new Image();
               //newImage.src = `/images/${req.file.filename}`;
               newImage.src = req.file.location;
               newImage.dates = dateTime.toLocaleString();
               newImage.mongoId = req.user.id || req.user._id;
               newImage.filter = "filter:none;"
               newImage.save();               
           }
       }
   });
});

//redirects to the home page when any error is detected
app.use(function (err, req, res, next) {
  console.error(err.stack)
  if(err){
    res.redirect('/');
  }
  //res.status(500).send('Something broke!')
})


// app.use(function (req, res, next) {
//   res.status(404).send(pageNotFound);
// })




/************************************ Passport Local ******************************************/



var indexRouter= require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth-routes-local')(passport);



// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));






app.use('/', indexRouter);
app.use('/users2', usersRouter);
app.use('/authent', authRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


app.listen(port, function(){
   console.log('app listening on port ' + port);
});