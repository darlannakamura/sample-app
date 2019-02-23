'use strict';

const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { ENVIRONMENT } = require('../src/config');
const mongoose = require('mongoose');

chai.use(chaiHttp);
const expect = chai.expect;

let emailAddress;
let user;

describe('User Register', function(done) {
    after(function(){
        this.timeout(30000);

        if( ENVIRONMENT == 'TEST'){
            //clearDB
            mongoose.connection.collection('users').deleteOne({email: emailAddress});
        } else {
            this.skip();
        }
    });

    it('Should not create a user', function(done) {
        this.timeout(30000);
        chai.request(server)
            .post('/user')
            .send({
                name: 'Common Name',
                email: 'incorrectemail.com',
                password: 'simplepass123',
                cpf: "884.135.280-97"
            })
            .end(function(err, res) {
                expect(res).to.have.status(500);
                done();
            });
    });

    it('Should create a user', function(done) {
        this.timeout(30000);

        let email = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        let domain = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

        emailAddress = email+'@'+domain+'.com';

        chai.request(server)
            .post('/user')
            .send({
                name: 'Common Name',
                email: emailAddress,
                password: 'correct_password',
                cpf: "884.135.280-97"
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });    
});


describe('Password Recovery', function(done) {
    before(function(done){
        this.timeout(30000);

        if( ENVIRONMENT == "TEST"){
            user = {
                name: 'Forgot My Password',
                email: 'someemail@domain.com',
                password: "very difficult password",
                cpf: "30293770085"
            };
    
            chai.request(server)
                .post('/user')
                .send(user)
            .end(function(err, res) {
                // expect(res).to.have.status(200);
                done();
            });
        } else {
            this.skip();
        }
    });

    after(function(){
        this.timeout(30000);

        if( ENVIRONMENT == 'TEST'){
            //clearDB
            mongoose.connection.collection('users').deleteOne({email: user.email});
        } else {
            this.skip();
        }
    });

    it('Should not recover (invalid combination)', function(done) {
        this.timeout(30000);

        chai.request(server)
            .post('/user/password-recovery')
            .send({
                email: 'wrong.email@domain.com',
                cpf: user.cpf
            })
        .end(function(err, res) {
            expect(res).to.have.status(404);
            done();
        });
    });

    it('Should recover the password', function(done) {
        this.timeout(30000);

        chai.request(server)
            .post('/user/password-recovery')
            .send({
                email: user.email,
                cpf: user.cpf
            })
        .end(function(err, res) {
            if(res.status == 500){
                console.log(res.body);
            }

            expect(res).to.have.status(200);
            done();
        });
    });


    //TODO: reset password tests
});

