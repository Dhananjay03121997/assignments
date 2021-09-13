const router = require('express').Router();
const mongoose = require('mongoose');

const Constant = require('../helper/Constant');
const constant = require('../helper/Constant');
const subject = require('../models/Subject');


router.post('/add/subject', async(req,res)=>{
    try {
        if (!Boolean(req.query.name)) {
            return res.status(400).send({message : constant.pleaseProvide.replace('{{name}}', "subject name")});
        }
        let alreadyExists = await subject.findOne({name: req.query.name});
        if(Boolean(alreadyExists)){
            return res.status(400).send({message:Constant.alreadyExists.replace('{{name}}', "Subject")});
        }
        let newSubject = new subject(req.query);
        await newSubject.save();
        return res.status(200).send({message : constant.addSuccess.replace('{{name}}', 'Subject')});
    } catch (error) {
        return res.status(400).send({messsage: error.message});
    }
})

router.get('/subjects', async(req,res)=>{
    try {
        let subjectList = await subject.find({});
        if(subjectList.length == 0){
            return res.status(200).send({message: constant.noRecordsFound});
        }
        return res.status(200).send({subjectList: subjectList});
    } catch (error) {
        return res.status(400).send({error: error.message});   
    }
})


module.exports = router;