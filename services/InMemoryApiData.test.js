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
                [{ "id": "0391a1cc-2c00-47b8-9880-aa9fe96bef51" },
                { "id": "0dafb276-1620-42ce-bbc5-477209733d5c" },
                { "id": "c35832f6-a634-41f1-9dd4-942116dd5297" },
                { "id": "9c4ce9dc-92ed-49d0-ad3f-ce634d74483e" },
                { "id": "6a1201cf-b9f0-4cf1-83e3-411077a563ab" },
                { "id": "6d040d13-4086-4167-bb51-742f775e0269" },
                { "id": "b1f12e47-ba23-4fac-8a65-0eaa4f9fbd52" },
                { "id": "b191ead6-e983-4a16-a9a6-07f644275d1f" },
                { "id": "1c436428-73bb-46c4-adc9-cd5f2c7d34b4" },
                { "id": "0a712644-9fad-4934-85b9-41745e5b4e27" },
                { "id": "f9b7aee5-b0f8-4e1b-a6cf-9b377cff728a" },
                { "id": "698a68f1-e157-4a15-b99a-0e590e7eec20" },
                { "id": "4bc611a2-3d54-4e66-a9ac-41d4ee9a2681" },
                { "id": "32a776f1-4b9e-4c55-8d44-6aa27a4137ee" },
                { "id": "b5772b44-5b01-46fb-963b-fd4abe75cf5d" },
                { "id": "17923da6-19cb-4092-8582-00fd16a72f9b" },
                { "id": "893876a3-46ec-46ff-ab5f-e0345cde5dde" },
                { "id": "e0d708b9-64b9-49e1-9405-1dbf09dafa2d" },
                { "id": "310323bf-f3db-475f-94fc-9f800ae4acc3" },
                { "id": "d4300618-bac7-458d-b810-79e03bd9e927" },
                { "id": "5eb7ecb4-4e05-4a39-a41f-a26f7936c6e5" },
                { "id": "9d931267-46e7-46c7-b551-5ad0d63e4edb" },
                { "id": "6ad4a7d2-307d-413a-82c5-115c8321eede" },
                { "id": "fcecddff-a895-4612-bf87-2961d6ba8934" },
                { "id": "c91a46ac-6254-4b17-a98c-1ea17076066d" },
                { "id": "90e22faf-6f31-4915-8aab-b546e2a2a68e" },
                { "id": "e9209135-afca-45a9-ae37-88fdc0fe1b90" },
                { "id": "ba63c1cd-c29f-451e-a73d-1f554e9b63c2" },
                { "id": "062d13f6-c2c8-4839-beab-f2044fc6c5e3" },
                { "id": "ef9ae01f-2513-4315-aa92-31e432a320dd" },
                { "id": "96992db8-c9bf-4183-8738-c00c48165859" },
                { "id": "7113fe09-0d63-41ce-a329-a7b23094e4ef" },
                { "id": "92495f1a-4e0a-4130-98d0-40c9618b240b" },
                { "id": "5e06cc25-1f02-4cf6-908e-73a3f5278089" },
                { "id": "04376b81-9d34-4d25-9e09-f1e6ceec474e" },
                { "id": "b73546b1-aa60-4469-b815-aacb395dbc3e" },
                { "id": "af194f38-7e65-4443-be6c-d265c61a1bc6" },
                { "id": "abf58203-cc0c-49ca-9d46-bdf8536d78b3" },
                { "id": "12d81c42-506a-4796-891b-ba96e0c5ee67" },
                { "id": "5da19dad-7397-44d4-9f12-73486cb81399" },
                { "id": "777e58b3-63bd-4fb7-af9a-bbf7069f1782" },
                { "id": "17ee80b8-613d-4e61-9de6-6e52eb1fbd16" },
                { "id": "cba5fac1-edcf-443f-9e99-684a044eec8e" },
                { "id": "223870c1-c005-47e8-8208-be8aa91de013" },
                { "id": "21dc2de5-309c-41e9-aba0-0375771eb046" },
                { "id": "3be67d35-39f9-459e-bd3d-3e44c40e1535" },
                { "id": "feb30604-8b74-4316-b795-95b99e326f9c" },
                { "id": "e99490e2-a1f6-4950-914e-4a9676ee312f" },
                { "id": "5f341370-525d-4692-9a27-4c09692e259e" },
                { "id": "4b90ea55-425d-4bc9-92fe-b74a7b3125b0" },
                { "id": "e10dee27-8507-4afb-8ce2-106ca05552eb" },
                { "id": "5ac31fa9-010b-46cd-9903-782dd29c2248" },
                { "id": "5ce5b4fa-5e1e-4eaf-b7e8-f32b697883ec" },
                { "id": "1aba397f-c385-4dd2-9c7d-63dd64aa5ff4" },
                { "id": "da79008f-7176-4fd2-85a1-4272fb79f157" },
                { "id": "fc5d79dc-d1da-4553-a139-1d6fa828c7d4" },
                { "id": "abe5bce3-9b31-4ece-acfc-dd8990067c78" },
                { "id": "6dcc76fa-1ce8-4e23-8688-5777be17db0e" },
                { "id": "50456415-4ea0-42b2-adae-063edce3225c" }]
            )
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
        it('should filter through account data based on a firstname', () => {
            inMemoryApiData.responseData = stubData.accounts
            expect(inMemoryApiData.getAccountByFirstOrLastName('Cyrus')).toEqual(
                [{
                    "id": "8a28f09a-c234-4a95-b1e0-cdbc68979d0a",
                }
                ]);
        });
        it('should filter through account data based on a lastname', () => {
            inMemoryApiData.responseData = stubData.accounts
            expect(inMemoryApiData.getAccountByFirstOrLastName('', 'David')).toEqual(
                [{
                    "id": "8a28f09a-c234-4a95-b1e0-cdbc68979d0a",
                }]);
        });
        it('should filter through account data based on a first and lastname', () => {
            inMemoryApiData.responseData = stubData.accounts
            expect(inMemoryApiData.getAccountByFirstOrLastName('Giana', 'Mueller')).toEqual(
                [{
                    "id": "0dafb276-1620-42ce-bbc5-477209733d5c"
                }]);
        });

        it('should filter through account data based on a first and lastname regardless of case sensitvity', () => {
            inMemoryApiData.responseData = stubData.accounts
            expect(inMemoryApiData.getAccountByFirstOrLastName('GIANA', 'MueLLer')).toEqual(
                [{
                    "id": "0dafb276-1620-42ce-bbc5-477209733d5c"
                }]);
        });
    });

    describe('getAccountFilteredByBalance', () => {
        it('should filter through account data based on a minimum balance amount', () => {
            inMemoryApiData.responseData = stubData.accounts
            expect(inMemoryApiData.getAccountFilteredByBalance("8000")).toEqual(
                [{
                    "balance": 8759.84,
                    "id": "861fc585-3313-4928-891d-c8711dfe3f8a"
                },
                {
                    "balance": 9029.43,
                    "id": "02fb54d8-12f4-452e-886c-24fe0219c1b6"
                },
                {
                    "balance": 8577.01,
                    "id": "06d1dc7a-2f0d-4c7d-a90e-c4c6fa27edce"
                },
                {
                    "balance": 8891.14,
                    "id": "17442e15-01e1-4dd6-867e-45521a6be455"
                },
                {
                    "balance": 8280.49,
                    "id": "6ff3f22f-a69a-4798-aea4-39db4f525a8e"
                },
                {
                    "balance": 8614.14,
                    "id": "1d10dd00-1015-468f-a6fb-bc264531be54"
                }]);
        });
        it('should filter through account data based on a maximum balance amount', () => {
            inMemoryApiData.responseData = stubData.accounts
            expect(inMemoryApiData.getAccountFilteredByBalance("", "-9000")).toEqual(
                [{
                    "balance": -9101.73,
                    "id": "c35832f6-a634-41f1-9dd4-942116dd5297"
                },
                {
                    "balance": -9771.71,
                    "id": "0a712644-9fad-4934-85b9-41745e5b4e27"
                },
                {
                    "balance": -9532.24,
                    "id": "310323bf-f3db-475f-94fc-9f800ae4acc3"
                },
                {
                    "balance": -9876.81,
                    "id": "062d13f6-c2c8-4839-beab-f2044fc6c5e3"
                },
                {
                    "balance": -9472.41,
                    "id": "fc5d79dc-d1da-4553-a139-1d6fa828c7d4"
                }])
        });
        it('should filter through account data based on given minimum and a maximum balance amount', () => {
            inMemoryApiData.responseData = stubData.accounts
            expect(inMemoryApiData.getAccountFilteredByBalance("5000.00", "7000.00")).toEqual(
                [{
                    "balance": 6989.31,
                    "id": "5cc050a1-702e-4cbd-9b56-4da534fe84b8"
                },
                {
                    "balance": 6456.71,
                    "id": "be35cf33-6363-4418-9195-412073550867"
                },
                {
                    "balance": 6947.18,
                    "id": "41f97f86-ff9b-49de-8476-035ed2c4121c"
                },
                {
                    "balance": 6141.92,
                    "id": "a4e55874-8d68-4695-be9f-bdbddc5e0abf"
                },
                {
                    "balance": 5566.46,
                    "id": "62692686-0e56-4a90-8dfe-85b021c9ab14"
                },
                {
                    "balance": 6658.94,
                    "id": "73d5789f-2524-4389-99d0-953872c071a7"
                },
                {
                    "balance": 5242.4,
                    "id": "200ab890-53e8-4cd5-a8b5-6dfd8b1ec6df"
                },
                {
                    "balance": 5401.79,
                    "id": "be9b2a8b-e846-4365-8d5f-0fca4ef9aefb"
                },
                {
                    "balance": 6181.2,
                    "id": "065136cf-7d0a-4496-8896-7979234c58fb"
                },
                {
                    "balance": 5970.9,
                    "id": "be0438bf-8b0d-4c57-913d-fcafb0bb41f0"
                },
                {
                    "balance": 5469.47,
                    "id": "ebd186dc-16ad-4a83-bda8-fca8b4aa2e34"
                }])

        });
    });
});