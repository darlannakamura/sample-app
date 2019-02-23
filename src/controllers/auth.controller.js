'use strict';

const model = require('../models/user.model');
const authService = require('../services/auth.service');
const md5 = require('md5');
const { SALT_KEY } = require('../config');
const errorHelper = require('../helpers/error.helper');

class AuthController {
    constructor(){
        this.authenticate = this.authenticate.bind(this);
    }

    async authenticate(req, res, next){
        try {
            // Validator.authValidator(req);

            const user = await model.authenticate({
                email: req.body.email,
                password: md5(req.body.password + SALT_KEY)
            });

            if(user == null){
                res.status(404).send({
                    message: 'Usuário ou senha inválidos'
                });
                return;
            }

            const token = await authService.generateToken({
                id: user._id,
                email: user.email,
                name: user.name
            });

            res.status(200).send({
                token: token
            });

         } catch (e) {
             errorHelper.handleError(e, res);
         }
    }

    async refreshToken(req, res, next){
        try{

        } catch (e) {
            errorHelper.handleError(e, res);
        }
    }
}

var controller = new AuthController(); 
module.exports = controller;