const moxios = require('moxios'),
    expect = require('expect'),
    sinon = require('sinon'),
    InMemoryApiData = require('./inMemoryApiData'),
    stubData = require('../stubData/stubData.json'),
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

    describe('getAccountHolderBalance', () => {
        it('should filter through the customer data to return accounts whose balance is less than or equal to zero', () => {
            inMemoryApiData.responseData = stubData.accounts
            expect(inMemoryApiData.getAccountHolderBalance('1c436428-73bb-46c4-adc9-cd5f2c7d34b4')).toEqual(
                { "0": { "balance": "-945.55" } })
        })
    });

    describe('getAccountHolderDetails', () => {
        it('should filter through the customer data to return the accounts email, firstname, lastname and telephone', () => {
            inMemoryApiData.responseData = stubData.accounts
            expect(inMemoryApiData.getAccountHolderDetails('1c436428-73bb-46c4-adc9-cd5f2c7d34b4')).toEqual(
                {
                    "0": {
                        "Email": "Lil.PRU8222@mailinator.com",
                        "First Name": "Lillie",
                        "Last Name": "Pruitt",
                        "Telephone": "01526 810866",
                    },
                })
        })
    });

    describe('getAccountsInDebt', () => {
        it('should filter through the customer data to return accounts whose balance is less than or equal to zero', () => {
            inMemoryApiData.responseData = stubData.accounts
            expect(inMemoryApiData.getAccountsInDebt()).toEqual(
                {
                    "0": {
                        "id": "1c436428-73bb-46c4-adc9-cd5f2c7d34b4",
                    },
                    "1": {
                        "id": "698a68f1-e157-4a15-b99a-0e590e7eec20",
                    },
                    "2": {
                        "id": "e0d708b9-64b9-49e1-9405-1dbf09dafa2d",
                    },
                    "3": {
                        "id": "5eb7ecb4-4e05-4a39-a41f-a26f7936c6e5",
                    },
                    "4": {
                        "id": "223870c1-c005-47e8-8208-be8aa91de013",
                    },
                    "5": {
                        "id": "3be67d35-39f9-459e-bd3d-3e44c40e1535",
                    },
                    "6": {
                        "id": "1aba397f-c385-4dd2-9c7d-63dd64aa5ff4",
                    },
                });
        });
    });

    describe('getAccountForCustomerView', () => {
        it('should filter through an accounts data using its guid to return the accounts email, firstname, lastname and balance', () => {
            inMemoryApiData.responseData = stubData.accounts
            expect(inMemoryApiData.getAccountForCustomerView('1c436428-73bb-46c4-adc9-cd5f2c7d34b4')).toEqual(
                {
                    "0": {
                        "Email": "Lil.PRU8222@mailinator.com",
                        "First Name": "Lillie",
                        "Last Name": "Pruitt",
                        "Balance": "-945.55",
                    },
                })
        })
    });
});