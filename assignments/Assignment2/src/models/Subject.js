const mongoose = require('mongoose');

let subjects = mongoose.model('subject',{
    name:{
        type: String,
        required: true,
        trim: true
    }
});

module.exports = subjects;