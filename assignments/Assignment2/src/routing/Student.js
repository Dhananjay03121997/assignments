const router = require('express').Router();
const mongoose = require('mongoose');
const constant = require('../helper/Constant');
const student = require('../models/Student');
const studentSubjectMapping = require('../models/StudentSubjectMapping');

router.post('/add/student', async(req,res)=>{
    try {
        if (!Boolean(req.body.name)) {
            return res.status(400).send({message: constant.pleaseProvide.replace('{{name}}', "name")});
        }
        if (!Boolean(req.body.email)) {
            return res.status(400).send({message: constant.pleaseProvide.replace('{{name}}', "email")});
        }
        let newStudent = new student(req.body);
        await newStudent.save();
        return res.status(200).send({message: constant.addSuccess.replace('{{name}}', "Student"), newStudent:newStudent});
    } catch (error) {
        return res.status(400).send({error: error.message});
    }
})

router.get('/students', async(req,res)=>{
    try {
        let studentList = await student.find({});
        if (studentList.length == 0) {
            return res.status(200).send({message:constant.noRecordsFound});
        }
        if (studentList.length == 0) {
            return res.status(200).send({message: constant.noRecordsFound});
        }
        return res.status(200).send({studentList: studentList});
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
})

router.post('/add/subjects-to-student', async(req,res)=>{
    try {
        if (!Boolean(req.body.studentId)) {
            return res.status(400).send({message: constant.pleaseProvide.replace('{{name}}', "student Id.")});
        }
        if (!Boolean(req.body.subjects.length) || req.body.subjects.length == 0) {
            return res.status(400).send({message: constant.pleaseProvide.replace('{{name}}', "subjects Id.")});
        }
        let subjects = req.body.subjects, subjectIdList = [], newSubjectMapping =[];
        subjects.forEach(subjects => {
            subjectIdList.push(subjects.subjectId),
            newSubjectMapping.push({
                studentId : mongoose.Types.ObjectId(req.body.studentId),
                subjectId : subjects.subjectId
            })
        });
        let alreadyExists = await studentSubjectMapping.find({studentId : mongoose.Types.ObjectId(req.body.studentId), subjectId :{ $in:subjectIdList}});
        if (alreadyExists.length > 0) {
            return  res.status(400).send({message: constant.alreadyExists.replace('{{name}}', "Subjects")});
        }
        await studentSubjectMapping.insertMany(newSubjectMapping);
        return res.status(200).send({message: constant.addSuccess.replace('{{name}}', "Subjects to student"),newSubjectToStudents : newSubjectMapping});
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
})

router.get('/get-subjects-taken-by-student', async(req,res)=>{
    try {
        let match = {};
        if (Boolean(req.query.studentId)) {
            match['studentId'] = mongoose.Types.ObjectId(req.query.studentId);
        }
        let subjectList = await studentSubjectMapping.aggregate([
            {
                $match:match
            },
            {
                $lookup:{
                    from: 'students',
                    localField: 'studentId',
                    foreignField: '_id',
                    as: "student"
                }
            },
            {
                $lookup:{
                    from: 'subjects',
                    localField: 'subjectId',
                    foreignField: '_id',
                    as: "subject"
                }
            },
            {$unwind: "$student"},
            {$unwind: "$subject"},
            {
                $project:{
                    studentId:1,
                    subjectId: 1,
                    studentName: '$student.name',
                    subjectName: '$subject.name'
                }
            },
            {$sort:{"studentName":1,"subjectName":1}}
        ])
        return res.status(200).send({subjectList:subjectList});
    } catch (error) {
        return res.status(400).send({error: error.message});
    }
})

module.exports = router;