process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('App', function () {

    let accountId = '06d1dc7a-2f0d-4c7d-a90e-c4c6fa27edce'

    describe('GET /', function () {
        it('responds with status 200', function(done) {
            chai.request(app)
            .get('/')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            });
        });
    });

    describe('GET /balance/:accountId', function () {
        it('responds with status 200', function(done) {
            chai.request(app)
            .get(`/balance/${accountId}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('balance')
                done()
            });
        });
    });

    describe('GET /details/:accountId', function () {
        it('responds with status 200', function(done) {
            chai.request(app)
            .get(`/details/${accountId}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('First Name')
                expect(res.body).to.have.property('Last Name')
                expect(res.body).to.have.property('Email')
                expect(res.body).to.have.property('Telephone')
                done()
            });
        });
    });
});