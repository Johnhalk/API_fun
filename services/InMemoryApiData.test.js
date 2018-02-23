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
                [
                    { "balance": "-945.55" }
                ]);
        });
    });

    describe('getAccountHolderDetails', () => {
        it('should filter through the customer data to return the accounts email, firstname, lastname and telephone', () => {
            inMemoryApiData.responseData = stubData.accounts
            expect(inMemoryApiData.getAccountHolderDetails('1c436428-73bb-46c4-adc9-cd5f2c7d34b4')).toEqual(
                [{
                    "Email": "Lil.PRU8222@mailinator.com",
                    "First Name": "Lillie",
                    "Last Name": "Pruitt",
                    "Telephone": "01526 810866",
                },
                ]);
        });
    });

    describe('getAccountsOverdrawn', () => {
        it('should filter through the customer data to return accounts whose balance is less than or equal to zero', () => {
            inMemoryApiData.responseData = stubData.accounts
            expect(inMemoryApiData.getAccountsOverdrawn()).toEqual(
                [{
                    "id": "1c436428-73bb-46c4-adc9-cd5f2c7d34b4",
                },
                {
                    "id": "698a68f1-e157-4a15-b99a-0e590e7eec20",
                },
                {
                    "id": "e0d708b9-64b9-49e1-9405-1dbf09dafa2d",
                },
                {
                    "id": "5eb7ecb4-4e05-4a39-a41f-a26f7936c6e5",
                },
                {
                    "id": "223870c1-c005-47e8-8208-be8aa91de013",
                },
                {
                    "id": "3be67d35-39f9-459e-bd3d-3e44c40e1535",
                },
                {
                    "id": "1aba397f-c385-4dd2-9c7d-63dd64aa5ff4",
                },
                ]);
        });
    });

    describe('getAccountForCustomerView', () => {
        it('should filter through an accounts data using its guid to return the accounts email, firstname, lastname and balance', () => {
            inMemoryApiData.responseData = stubData.accounts
            expect(inMemoryApiData.getAccountForCustomerView('1c436428-73bb-46c4-adc9-cd5f2c7d34b4')).toEqual(
                [{
                    "Email": "Lil.PRU8222@mailinator.com",
                    "First Name": "Lillie",
                    "Last Name": "Pruitt",
                    "Balance": "-945.55",
                },
                ]);
        });
    });

    describe('getAccountByFirstOrLastName', () => {
        it('should filter through customer data based on a firstname', () => {
            inMemoryApiData.responseData = stubData.accounts
            expect(inMemoryApiData.getAccountByFirstOrLastName('Cyrus')).toEqual(
                [{
                    "balance": "3,702.54",
                    "email": "Cy.DAVI5969@dispostable.com",
                    "firstname": "Cyrus",
                    "id": "8a28f09a-c234-4a95-b1e0-cdbc68979d0a",
                    "lastname": "David",
                    "telephone": "01721 578054",
                },
                {
                    "balance": "3,702.54",
                    "email": "Cy.DAVI5969@dispostable.com",
                    "firstname": "Cyrus",
                    "id": "8a28f09a-c234-4a95-b1e0-cdbc68979d0a",
                    "lastname": "Raymond",
                    "telephone": "01721 578054",
                },
                ]);
        });
        it('should filter through customer data based on a lastname', () => {
            inMemoryApiData.responseData = stubData.accounts
            expect(inMemoryApiData.getAccountByFirstOrLastName('', 'David')).toEqual(
                [{
                    "balance": "3,702.54",
                    "email": "Cy.DAVI5969@dispostable.com",
                    "firstname": "Cyrus",
                    "id": "8a28f09a-c234-4a95-b1e0-cdbc68979d0a",
                    "lastname": "David",
                    "telephone": "01721 578054"
                },
                {
                    "balance": "3,702.54",
                    "email": "Cy.DAVI5969@dispostable.com",
                    "firstname": "Pie",
                    "id": "8a28f09a-c234-4a95-b1e0-cdbc68979d0a",
                    "lastname": "David",
                    "telephone": "01721 578054"
                }]);
        });
        it('should filter through customer data based on a first and lastname', () => {
            inMemoryApiData.responseData = stubData.accounts
            expect(inMemoryApiData.getAccountByFirstOrLastName('Giana', 'Mueller')).toEqual(
                [{
                    "balance": "-6,454.72",
                    "email": "Gian.MUEL3296@yopmail.com",
                    "firstname": "Giana",
                    "id": "0dafb276-1620-42ce-bbc5-477209733d5c",
                    "lastname": "Mueller",
                    "telephone": "01178 766240"
                },
                {
                    "balance": "302.54",
                    "email": "Cy.DAVI5969@dispostablety.com",
                    "firstname": "Giana",
                    "id": "8a28f09a-c234-4a95-b1e0-cdbc68979d0addd",
                    "lastname": "Mueller",
                    "telephone": "01721 5780543"
                }]);
        });

        it('should filter through customer data based on a first and lastname regardless of case sensitvity', () => {
            inMemoryApiData.responseData = stubData.accounts
            expect(inMemoryApiData.getAccountByFirstOrLastName('GIANA', 'MueLLer')).toEqual(
                [{
                    "balance": "-6,454.72",
                    "email": "Gian.MUEL3296@yopmail.com",
                    "firstname": "Giana",
                    "id": "0dafb276-1620-42ce-bbc5-477209733d5c",
                    "lastname": "Mueller",
                    "telephone": "01178 766240"
                },
                {
                    "balance": "302.54",
                    "email": "Cy.DAVI5969@dispostablety.com",
                    "firstname": "Giana",
                    "id": "8a28f09a-c234-4a95-b1e0-cdbc68979d0addd",
                    "lastname": "Mueller",
                    "telephone": "01721 5780543"
                }]);
        });
    });
});