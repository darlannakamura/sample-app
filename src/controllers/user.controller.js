'use strict';

const md5 = require('md5');
const { SALT_KEY } = require('../config');
const model = require('../models/user.model');
const errorHelper = require('../helpers/error.helper');
const validator = require('../services/validator.service');
const emailService = require('../services/email.service');
const authService = require('../services/auth.service');

exports.create = async(req, res, next) => {
    try {
        let { email, password, name, cpf } = req.body;

        cpf = cpf.replace('-', '').replace('.', '');

        if(!validator.cpfIsValid(cpf)){
            res.status(400).send({
                message: 'CPF inválido'
            }); 
            return;
        }

        await model.create({
            name,
            email,
            cpf,
            password: md5(password + SALT_KEY),
        });

        res.status(200).send({
            message: 'Conta criada com sucesso!'
        });


     } catch (e) {
         errorHelper.handleError(e, res);
     }
}

exports.passwordRecovery = async(req, res, next) => {
    try { 
        let { email, cpf } = req.body;

        const user = await model.getOne({
            email,
            cpf
        });

        if(user) {
            let token = await authService.generateToken({
                id: user._id,
                email: user.email,
                name: user.name
            });

            let body = 'Envie um POST para http://localhost:3000/user/reset-password/?token='+token+
            " com o body: {password: NOVA_SENHA}";
            
            await emailService.send(email, 'Recuperação de Senha', body);

            res.status(200).send({
                message: 'Enviamos um e-mail para '+email+' para que você possa redefinir sua senha.'
            });
        } else {
            res.status(404).send({
                message: 'Não encontramos nenhum usuário com este e-mail e cpf.'
            });
        }
    } catch (e) {
        errorHelper.handleError(e, res);
    }
}

exports.resetPassword = async(req, res, next) => {
    try { 
        if(!req.query.token){
            res.status(404).send({
                message: 'Token não encontrado'
            });
        }
    
        let data = await authService.decodeToken(req.query.token);
    
        await model.update(
            {
                _id: data.id
            },
            {
                password: md5(req.body.password + SALT_KEY)
            }
        );
    
        res.status(200).send({
            message: 'Senha alterada com sucesso!'
        });
    } catch (e) {
        errorHelper.handleError(e, res);
    } 
}