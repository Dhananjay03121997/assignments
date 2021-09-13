const mongoose = require('mongoose');

const studentSubjectMapping = mongoose.model('mapping',{
    studentId:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'students'
    },
    subjectId:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'subjects'
    }
})

module.exports = studentSubjectMapping;