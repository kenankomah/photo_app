const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const schema = mongoose.Schema;

//required is set to true to indicate that the value is required for validation
const userSchema = new schema({
    username:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true
    },
    thumbnail:String
});

userSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function(password, hash){
    return bcrypt.compareSync(password, hash);
}

module.exports = mongoose.model('users2', userSchema, 'users2');