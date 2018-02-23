let chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    app = require('../app'),
    should = chai.should(),
    config = require('../config.json')

chai.use(chaiHttp);

describe('App', function () {

    let customerId = config.baseCustomerId
    let accountId = '06d1dc7a-2f0d-4c7d-a90e-c4c6fa27edce'

    describe('GET /', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .get('/')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body[0]).to.have.property('id')
                    done()
                });
        });
    });

    describe('GET /customerid', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .get(`/${customerId}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body[0]).to.have.property('id')
                    done()
                });
        });
    });

    describe('GET /balance/:accountId', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .get(`/balance/${accountId}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body[0]).to.have.property('balance')
                    done()
                });
        });
    });

    describe('GET /details/:accountId', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .get(`/details/${accountId}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body[0]).to.have.property('First Name')
                    expect(res.body[0]).to.have.property('Last Name')
                    expect(res.body[0]).to.have.property('Email')
                    expect(res.body[0]).to.have.property('Telephone')
                    done()
                });
        });
    });

    describe('GET /accounts/overdrawn', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .get('/accounts/overdrawn')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body[0]).to.have.property('id')
                    done()
                });
        });
    });

    describe('GET /customer/details/:accountId', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .get(`/customer/details/${accountId}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body[0]).to.have.property('First Name')
                    expect(res.body[0]).to.have.property('Last Name')
                    expect(res.body[0]).to.have.property('Email')
                    expect(res.body[0]).to.have.property('Balance')
                    done()
                });
        });
    });
});