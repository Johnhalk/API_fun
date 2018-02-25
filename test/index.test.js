let chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    app = require('../app'),
    should = chai.should(),
    stubData = require('../stubData/stubData.json'),
    moxios = require('moxios'),
    config = require('../config.json')

chai.use(chaiHttp);

describe('App', function () {

    let customerId = config.baseCustomerId
    let accountId = '06d1dc7a-2f0d-4c7d-a90e-c4c6fa27edce'

    beforeEach(() => {
        moxios.install()
        const expectedResults = stubData
        moxios.wait(() => {
            const request = moxios
                .requests
                .mostRecent();
            request.respondWith({
                status: 200,
                response: expectedResults
            });
        });
    });

    afterEach(() => {
        moxios.uninstall()
    });

    describe('GET /', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .get('/')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done()
                });
        });
    });

    describe('GET /:customerid', function () {
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

    describe('GET /:customerid/balance/:accountId', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .get(`/${customerId}/balance/${accountId}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body[0]).to.have.property('balance')
                    done()
                });
        });
    });

    describe('GET /:customerid/details/:accountId', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .get(`/${customerId}/details/${accountId}`)
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

    describe('GET /:customerid/accounts/overdrawn', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .get(`/${customerId}/accounts/overdrawn`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body[0]).to.have.property('id')
                    done()
                });
        });
    });

    describe('GET /:customerid/customer/details/:accountId', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .get(`/${customerId}/customer/details/${accountId}`)
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

    describe('GET /:customerid/customer/account', function () {
        it('responds with status 200 with just firstname parameter', function (done) {
            let firstName = 'GiAna'
            chai.request(app)
                .get(`/${customerId}/customer/account?firstname=${firstName}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body[0]).to.have.property('id')
                    done()
                });
        });

        it('responds with status 200 with just lastname parameter', function (done) {
            let lastName = 'David'
            chai.request(app)
                .get(`/${customerId}/customer/account?lastname=${lastName}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body[0]).to.have.property('id')
                    done()
                });
        });

        it('responds with status 200 with firstname and lastname parameters', function (done) {
            let firstName = 'Curtis'
            let lastName = 'COTTON'
            chai.request(app)
                .get(`/${customerId}/customer/account?firstname=${firstName}&lastname=${lastName}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body[0]).to.have.property('id')
                    done()
                });
        });
    });

    describe('GET /:customerid/customer/account/balance', function () {
        it('responds with status 200 with just minamount parameter', function (done) {
            let minAmount = '100'
            chai.request(app)
                .get(`/${customerId}/customer/account/balance?minamount=${minAmount}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body[0]).to.have.property('id')
                    done()
                });
        });

        it('responds with status 200 with just maxamount parameter', function (done) {
            let maxAmount = '200'
            chai.request(app)
                .get(`/${customerId}/customer/account/balance?maxamount=${maxAmount}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body[0]).to.have.property('id')
                    done()
                });
        });

        it('responds with status 200 with minamount and maxamount parameters', function (done) {
            let minAmount = '100'
            let maxAmount = '200'
            chai.request(app)
                .get(`/${customerId}/customer/account/balance?minamount=${minAmount}&maxamount=${maxAmount}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body[0]).to.have.property('id')
                    done()
                });
        });
    });
});