const mongoose = require('mongoose')

const postschema = mongoose.Schema({
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    },
    location:{
        type:String
    }

})

module.exports = new mongoose.model('Post',postschema)