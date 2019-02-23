'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [6, 'Digite um nome maior que 6 caracteres.'],
        maxlength: [120, 'Digite um nome até 120 caracteres.']
    },
    email: {
        type: String,
        required: [true, "Não pode ser vazio."], 
        match: [/\S+@\S+\.\S+/, 'E-mail inválido.'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Digite uma senha maior que 6 caracteres.'],
        maxlength: [32, 'Digite uma senha de no máximo 32 caracteres.']
    },
    cpf: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const User = mongoose.model('User', schema);

exports.create = async(data) => {
    var user = new User(data);
    return await user.save();
}

exports.authenticate = async(data) => {
    let user =  await User.findOne({
        email: data.email,
        password: data.password
    });
    return user;
}

exports.update = async(id, data) => {
    const res = await User.findByIdAndUpdate(id,data);
    return res;
}

exports.getOne = async(data) => {
    return await User.findOne(data);
    
}