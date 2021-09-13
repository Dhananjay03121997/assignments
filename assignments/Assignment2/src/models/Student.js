const mongoose = require('mongoose');

const students = mongoose.model('student',{
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    }
})

module.exports = students;