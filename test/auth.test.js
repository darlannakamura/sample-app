'use strict';

const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { ENVIRONMENT } = require('../src/config');
const mongoose = require('mongoose');

chai.use(chaiHttp);
const expect = chai.expect;



describe('User authentication', function(done) {
    //HOOKS

    before(function(done){
        this.timeout(30000);

        if( ENVIRONMENT == 'TEST'){

            //setup config
            chai.request(server)
            .post('/user')
            .send({
                name: 'Common Name',
                email: 'correctemail@hotmail.com',
                cpf: "400.377.560-01",
                password: 'correct_password'
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
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
            mongoose.connection.collection('users').deleteOne({email: 'correctemail@hotmail.com'});
        } else {
            this.skip();
        }
    });

    it('Should not find a user', function(done) {
        this.timeout(30000);
        chai.request(server)
            .post('/auth')
            .send({
                email: 'unknown@something.com',
                password: 'nothing_correct'
            })
            .end(function(err, res) {
                expect(res).to.have.status(404);
                done();
            });
    });

    it('Should be unable to login', function(done) {
        this.timeout(30000);
        chai.request(server)
            .post('/auth')
            .send({
                email: 'unknown@something.com',
                password: 'wrong_password'
            })
            .end(function(err, res) {
                expect(res.status).to.equal(404);

                done();
            });
    });

    it('Should login successfully', function(done) {
        this.timeout(30000);
        chai.request(server)
            .post('/auth')
            .send({
                email: 'correctemail@hotmail.com',
                password: 'correct_password'
            })
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                expect(res.body.token).to.be.a('string');

                done();
            });
    });

});