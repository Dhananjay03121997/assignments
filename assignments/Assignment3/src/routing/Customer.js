const router = require('express').Router();
const bcrypt = require('bcrypt');

const constant = require('../helper/Constant');
const customer = require('../models/Customer');

router.post('/add/customer', async(req,res)=>{
    try {
        if (!Boolean(req.body.name)) {//name is provided or not
            return res.status(400).send({message: constant.pleaseProvide.replace('{{name}}', "name")});
        }
        if (!Boolean(req.body.email)) {//email is provided or not
            return res.status(400).send({message: constant.pleaseProvide.replace('{{name}}', "email")});
        }
        let alreadyExists = await exists(req.body.email);
        if (Boolean(alreadyExists)) {
            alreadyExists.name = req.body.name;
            alreadyExists.save();

        return res.status(200).send({message: constant.addSuccess.replace('{{name}}', "Customer"), CustomerDetails: alreadyExists});
        }else{
            let newCustomer = new customer(req.body);
            await newCustomer.save();
            return res.status(200).send({message: constant.addSuccess.replace('{{name}}', "Customer"), CustomerDetails: newCustomer});
        }
    } catch (error) {
        return res.status(400).send({'error': error.message});
    }
});

router.get('/customer', async(req,res)=>{
    try {
        let customerList = await customer.find({});
        if (customerList.length == 0) {
            return res.status(200).send({message: constant.noRecordsFound});
        }
        return res.status(200).send({customerList: customerList});
    } catch (error) {
        return res.status(400).send({'error': error.message});
    }
});


async function exists (email){
    let dataExists = await customer.findOne({email : email});
    if(Boolean(dataExists)){
        return dataExists;
    }else{
        return false;
    }
}

module.exports = router;