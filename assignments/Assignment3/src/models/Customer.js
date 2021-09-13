const mongoose= require('mongoose')
const validator= require('validator');
const bcrypt = require('bcrypt');

const Constant = require('../helper/Constant');

const customerSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true
    },
    email:{
        type: String,
        trim: true,
        reuired: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(Constant.invalid.replace('{{name}}', 'Email'));
            }
        }
    },
})


let customer = mongoose.model('customer', customerSchema)
module.exports= customer;