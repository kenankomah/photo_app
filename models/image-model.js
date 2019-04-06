const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ImageSchema = new Schema({
    src:String,
    dates:String,
    mongoId:String,
    filter:String
 });



module.exports = mongoose.model('images', ImageSchema);
