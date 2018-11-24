var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ImageSchema = new Schema({
    src:String,
    dates:String,
    mongoId:String
 });



module.exports = mongoose.model('images', ImageSchema);
