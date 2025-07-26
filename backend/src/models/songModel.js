const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    title:String,
    artist:String,
    audio:String,
    mood:String,
});


module.exports = mongoose.model('Song', songSchema);