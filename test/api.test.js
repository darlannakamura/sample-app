'use strict';

const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { ENVIRONMENT } = require('../src/config');
chai.use(chaiHttp);
const expect = chai.expect;

describe('Check API status', function(done) {
    console.log('NODE_ENV');
    console.log(process.env.NODE_ENV);

    console.log('ENVIRONMENT');
    console.log(ENVIRONMENT);

    it('Should verify API status', function(done) {
        chai.request(server)
            .get('/')
            .end(function(err, res) {
                expect(res).to.have.status(200);

                done();
            });
    });
});