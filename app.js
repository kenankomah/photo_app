const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./models/book-model');
const keys = require('./config/keys');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const fs = require("fs");

const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');

function deleteImageFile(fileTodelete){
  try {
      fs.unlinkSync("");
  } catch (err) {
      console.log(err);
  }
  console.log(fileTodelete);
  fs.unlink("./client/images/" + fileTodelete, function(err){
    if(err){
      console.log(err);
    }else{
      console.log("image removed");
    }
  });
}


const port = process.env.PORT || 8000;

app.listen(process)

mongoose.connect(keys.mongodb.dbURI);

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


app.get('/books/:id',function(req, res){
    console.log('getting one book');
    Book.findOne({
        _id:req.params.id
    })
    .exec(function(err, book){
       if(err){
         res.send('error occured') ;
       }else{
        //  console.log(book);
          res.json(book);
       }
    })
});



app.post('/book2', function(req, res){
  Book.create(req.body, function(err, book){
    if(err){
       res.send('error saving book');
    } else{
      console.log(book);
      res.send(book);
    }
  });
});

app.put('/book/:id', function(req, res){
  Book.findOneAndUpdate({
    _id:req.params.id
  },
  {$set:{src: req.body.src}},
    {upsert:true},
    function(err, newBook){
      if(err){
        console.log('error occured');
      }else{
        console.log(newBook);
        res.status(204);
      }
    });
});

app.delete('/book/:id', function(req, res){
  Book.findOneAndRemove({
    _id:req.params.id
  },function(err, book){
    if(err){
      res.send('error deleting')
    }else{
    //  console.log(book);
      const imageName = book.src.replace("/images/","");
      deleteImageFile(imageName);
      res.send(book);
    }
  });
});

/**************************************** image upload code ******************************************/

//Set Storage Engine
const storage = multer.diskStorage({
  //  destination:'./public/uploads/',
    destination:'../client/images/',
    filename: function(req, file, cb){
       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Init upload
const upload = multer({
    storage: storage,
    limits:{fileSize:1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('myImage');

//Check File Type
function checkFileType(file, cb){
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

// EJS
app.set('view engine', 'ejs');

//Public Folder
app.use(express.static('./public'));



/****************************************************************** OAuth Login system code ****************************************************************************/

//set up view engine
//app.set('view engine','ejs');

//encerypts cookie and sets it's lifespan
app.use(cookieSession({
  maxAge:24*60*60*1000,
  keys:[keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());




//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/mongoid', (req, res)=>{
  res.send(req.user); 
});


app.get('/books', function(req, res){
    Book.find({})
    .exec(function(err, books){
       if(err){
         res.send('error has occured') ;
       }else{
         //filters the books array to only those that have a matching user id
         if(req.user){
          const filteredBooks = books.filter((el)=>{
              return req.user.id === el.mongoId;
          });
           res.json(filteredBooks);
         }
       }
    })
});

//create home route
app.get('/home', (req, res)=>{
  res.render('home',{user:req.user});
});


// Prevents issue with mime type
app.use(express.static('./client/'));  

//resolve is used as a security feature when navigating the files
app.get('/', function (req, res) {
  res.sendfile(path.resolve("./client/index.html"));
});


app.get('/upload_image', (req, res)=>{
  if(req.user){
    const mongodbId = "http://localhost:8080/?userId=" + req.user.id;
    const redirectLink = "window.location.href='" + mongodbId +"'";
    res.render('index',{userId:req.user});
  }else{
    res.redirect('/auth/login');
  }
});


app.post('/upload', (req, res) =>{
  const mongodbId = "http://localhost:8080/?userId=" + req.user.id;
  const redirectLink = "window.location.href='" + mongodbId +"'";
   upload(req, res, (err) => {
       if(err){
           res.render('index', {
               msg: err,
               userId:req.user               
            });
       } else {
          //console.log(req.file);
          console.log(req.user); 
           if(req.file === undefined){
              res.render('index', {
                  msg: 'Error: No file selected!',
                  userId:req.user
              });
           }else{
            console.log(req.user); 
               res.render('index', {
                   msg: 'Image uploaded',
                   userId:req.user
               });
               // code below adds new image data to mongoose
               const dateTime = new Date();
               const newBook = new Book();
               newBook.src = `/images/${req.file.filename}`;
               newBook.dates = dateTime.toLocaleString();
               newBook.mongoId = req.user.id
               newBook.save();
              // console.log(req.user.id);
           }
       }
   });
});




app.listen(port, function(){
   console.log('app listening on port ' + port);
});
