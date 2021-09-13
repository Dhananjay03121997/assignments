const router = require('express').Router();
const bcrypt = require('bcrypt');

const constant = require('../helper/Constant');
const customer = require('../models/Customer');

router.post('/add/customer', async(req,res)=>{
    try {
        if (!Boolean(req.body.name)) {//name is provided or not
            return res.status(400).send({message: constant.pleaseProvide.replace('{{name}}', "name")});
        }
        if (!Boolean(req.body.contact)) {//contact is provided or not
            return res.status(400).send({message: constant.pleaseProvide.replace('{{name}}', "contact")});
        }
        if (!Boolean(req.body.email)) {//email is provided or not
            return res.status(400).send({message: constant.pleaseProvide.replace('{{name}}', "email")});
        }
        if (!Boolean(req.body.password)) {//password is provided or not
            return res.status(400).send({message: constant.pleaseProvide.replace('{{name}}', "password")});
        }
        let alreadyExists = await exists(req.body.contact);
        if (Boolean(alreadyExists)) {
            return res.status(400).send({message: constant.alreadyExists.replace('{{name}}', "Contact")});
        }
        let newCustomer = new customer(req.body);
        await newCustomer.save();
        return res.status(200).send({message: constant.addSuccess.replace('{{name}}', "Customer"), CustomerDetails: newCustomer});
    } catch (error) {
        return res.status(400).send({'error': error.message});
    }
});

router.post('/login', async(req,res)=>{
    try {
        if (!Boolean(req.body.contact)) {
            return res.status(400).send({message: constant.pleaseProvide.replace('{{name}}', "contact")});
        }
        if (!Boolean(req.body.password)) {
            return res.status(400).send({message: constant.pleaseProvide.replace('{{name}}', "password")});
        }
        let user = await exists(req.body.contact);
        if(!Boolean(user)){
            return res.status(400).send({message: constant.notFound.replace('{{name}}', "Contact")});
        }
        let match = await bcrypt.compare(req.body.password, user.password);
        if(Boolean(match)){
            return res.status(200).send({message: 'Login successfull.'});
        }else{
            return res.status(200).send({message: constant.kindlyCheck.replace('{{name}}', 'password')});
        }
    } catch (error) {
        return res.status(400).send({'error': error.message});
    }
})

router.get('/customer', async(req,res)=>{
    try {
        
        let customerList = await customer.find({});
        return res.status(200).send({customerList: customerList});
    } catch (error) {
        return res.status(400).send({'error': error.message});
    }
});


async function exists (contact){
    let dataExists = await customer.findOne({contact : contact});
    if(Boolean(dataExists)){
        return dataExists;
    }else{
        return false;
    }
}

module.exports = router;