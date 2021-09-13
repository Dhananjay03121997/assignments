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
    contact:{
        type: String,//if we need to add country code +91 thats why setting it string
        trim: true,
        required: true,
        validate(value){
            if(!validator.isLength(value,{min:10, max:13})){
                throw new Error(Constant.invalid.replace('{{name}}', 'Contact'));
            }
        }
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
    password:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isLength(value, {min:8})){
                throw new Error("Password should be minimum 8 characters long")
            }
        }
    }
})

customerSchema.pre('save', async function (next) {
    let newCustomer = this;
    if(newCustomer.isModified('password')){
        newCustomer.password = await bcrypt.hash(newCustomer.password, 8);
    }
    next()
})

let customer = mongoose.model('customer', customerSchema)
module.exports= customer;