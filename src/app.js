'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const config = require('./config');

const app = express();
const router = express.Router();

// Connecta ao banco
try{
    mongoose.set('useCreateIndex', true);
    mongoose.connect(config.connectionString, {useNewUrlParser: true});
}catch(e){
    app.use(function(req, res, next){
        res.status(500).send({
            message: e.message
        })
    });
    // throw new Error(e);
}

const User = require('./models/user.model.js');

const indexRouter = require('./routers/index.router');
const userRouter = require('./routers/user.router');
const authRouter = require('./routers/auth.router');

app.use(helmet());

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);

module.exports = app;