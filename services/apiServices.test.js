const axios = require('axios'),
    moxios = require('moxios'),
    sinon = require('sinon'),
    expect = require('expect'),
    stubData = require('../stubData/stubData.json'),
    getFromAxios = require("./apiServices");

let baseUrl = "https://mvf-devtest-s3api.s3-eu-west-1.amazonaws.com/a4a06bb0-3fbe-40bd-9db2-f68354ba742f.json"

describe('getFromAxios', () => {
    beforeEach(() => {
        moxios.install()
    });

    afterEach(() => {
        moxios.uninstall()
    });

    it('gets a response from api call', (done) => {
        const expectedResults = stubData

        moxios.stubRequest(baseUrl, {
            status: 200,
            response: expectedResults
        });

        const onFulfilled = sinon.spy()
        getFromAxios(baseUrl).then(onFulfilled)

        moxios.wait(() => {
            expect(onFulfilled.getCall(0).args[0].data).toBe(expectedResults)
            done()
        });
    });
});
