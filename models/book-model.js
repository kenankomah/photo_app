var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var BookSchema = new Schema({
    src:String,
    dates:String,
    mongoId:String
 });



module.exports = mongoose.model('images', BookSchema);
