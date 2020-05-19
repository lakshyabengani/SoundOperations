var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var audioSchema = new Schema({
    title:{
        type : String
    },
    duration:{
        type : Number
    },
    song_path:{
        type : String
    }
},
{timestamps:true})

module.exports = mongoose.model('Audio',audioSchema);