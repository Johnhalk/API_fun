const moxios = require('moxios'),
    expect = require('expect'),
    sinon = require('sinon'),
    InMemoryApiData = require('./inMemoryApiData'),
    stubData= require('../stubData/stubData.json'),
    config = require('../config.json')

describe('InMemoryApiData', () => {
    let inMemoryApiData

    beforeEach(() => {
        moxios.install()
        inMemoryApiData = new InMemoryApiData
    });

    afterEach(() => {
        moxios.uninstall()
    });

    describe('getDataFromApi', () => {
        it('should call the Api and save the response data to an array', async () => {
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
            let customerId = 'a4a06bb0-3fbe-40bd-9db2-f68354ba742f'
            await inMemoryApiData.getDataFromApi(customerId)
            expect(inMemoryApiData.responseData).toEqual(expectedResults.accounts)
        });
    });
});