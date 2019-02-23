'use strict';

const jwt = require('jsonwebtoken');

const { SALT_KEY } = require('../config');
const errorHelper = require('../helpers/error.helper');
const SampleError = require('../sample.error');

class AuthService {
    constructor(){
        this.generateToken = this.generateToken.bind(this);
        this.decodeToken = this.decodeToken.bind(this);
        this.getTokenFromRequest = this.getTokenFromRequest.bind(this);
        this.authorize = this.authorize.bind(this);
    }

    async generateToken(data){
        return jwt.sign(data, SALT_KEY, { expiresIn: '1d' });
    }

    async decodeToken(token){
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
    
        // return await jwt.verify(token, SALT_KEY);

        return await this.verify(token);
    }

    async verify(token){
        let data;
        await jwt.verify(token, SALT_KEY, function(error, decoded){
            if(error){
                throw new SampleError('Token inválido', 401);
            }
            data = decoded;
        });

        return data;
    }

    getTokenFromRequest(req){
        let token = req.headers['authorization'] || req.headers['x-access-token'];

        if(!token){
            throw new SampleError('Acesso Restrito', 401);
        }

        return token;
    }

    async getDataTokenFromRequest(req){
            let token = this.getTokenFromRequest(req);
            return await this.decodeToken(token);
    }

    async authorize(req, res, next){
        try {
            let token = this.getTokenFromRequest(req);
             
             await this.verify(token);
     
             next();
        }catch (e) {
            errorHelper.handleError(e, res);
        }
    }
}

var authService = new AuthService();
module.exports = authService;