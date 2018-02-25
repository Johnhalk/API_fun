const getFromAxios = require("./apiServices"),
    stubData = require("../stubData/stubData.json"),
    config = require('../config.json'),
    _ = require('lodash'),
    stringSimilarity = require('string-similarity');

let baseUrl = config.baseUrl

class InMemoryApiData {
    constructor() {
        this.responseData = []
    }

    // Calls the API based on customer guid and returns the response.
    getDataFromApi(customerId) {
        const url = `${baseUrl}${customerId}.json`
        return (getFromAxios(url))
            .then(
            response => {
                this.responseData = []
                this.responseData = this.responseData.concat(response.data.accounts)
            }
            )
            .catch(
            error => {
                throw new Error(`ERROR retrieving data `, error);
            }
            );
    };

    // Gets an account holders balance based on a specific account guid
    getAccountHolderBalance(accountId) {
        const userAccount = _.filter(this.responseData, function (o) { return o.id == accountId });
        const output = _.map(userAccount, function (item) {
            return { "balance": item.balance }
        });
        return output
    }

    // Gets an accounts details based on specific account guid
    getAccountHolderDetails(accountId) {
        const userAccount = _.filter(this.responseData, function (o) { return o.id == accountId });
        const output = _.map(userAccount, function (item) {
            return { "First Name": item.firstname, "Last Name": item.lastname, "Email": item.email, "Telephone": item.telephone }
        });
        return output

    }

    // Filters over data and returns IDs of accounts who are in debt.
    getAccountsOverdrawn() {
        const accountsInDebt = _.filter(this.getNoCommasAndPutToFloat(), function (o) { return o.balance <= 0 });
        const output = _.map(accountsInDebt, function (item) {
            return { id: item.id }
        });
        return output
    }

    //Get account details intended for customer view
    getAccountForCustomerView(accountId) {
        const userAccount = _.filter(this.responseData, function (o) { return o.id == accountId });
        const output = _.map(userAccount, function (item) {
            return { "First Name": item.firstname, "Last Name": item.lastname, "Email": item.email, "Balance": item.balance }
        });
        return output

    }

    // Get account details filtered by first name and/or last name
    getAccountByFirstOrLastName(firstName = '', lastName = '') {
        if (firstName != '' && lastName != '') {
            const userByFirstName = _.filter(this.responseData, function (o) { return o.firstname.toLowerCase() == firstName.toLowerCase() });
            const resultByLastName = _.filter(userByFirstName, function (o) { return o.lastname.toLowerCase() == lastName.toLowerCase() });
            const output = _.map(resultByLastName, function (item) {
                return { "id": item.id }
            });
            return output

        } else if (firstName != '') {
            const result = _.filter(this.responseData, function (o) { return o.firstname.toLowerCase() == firstName.toLowerCase() });
            const output = _.map(result, function (item) {
                return { "id": item.id }
            });
            return output

        } else if (lastName != '') {
            const result = _.filter(this.responseData, function (o) { return o.lastname.toLowerCase() == lastName.toLowerCase() });
            const output = _.map(result, function (item) {
                return { "id": item.id }
            });
            return output

        } else {
            return []
        }
    }

    // Get account details filtered by first name and/or last name whena name is partial or mispelt
    getAccountByBestMatchedFirstOrLastName(firstName = '', lastName = '') {
        if (firstName != '' && lastName != '') {
            const userByFirstName = _.filter(this.responseData, function (o) { return stringSimilarity.compareTwoStrings(firstName, o.firstname) >= 0.5 });
            const resultByLastName = _.filter(userByFirstName, function (o) { return stringSimilarity.compareTwoStrings(lastName, o.lastname) >= 0.5 });
            const output = _.map(resultByLastName, function (item) {
                return {
                    "inputFirstName": firstName,
                    "inputLastName": lastName,
                    "possibleFirstName": item.firstname,
                    "possibleLastName": item.lastname,
                    "id": item.id
                }
            });
            return output

        } else if (firstName != '') {
            const result = _.filter(this.responseData, function (o) { return stringSimilarity.compareTwoStrings(firstName, o.firstname) >= 0.5 });
            const output = _.map(result, function (item) {
                return {
                    "inputFirstName": firstName,
                    "inputLastName": lastName,
                    "possibleFirstName": item.firstname,
                    "possibleLastName": item.lastname,
                    "id": item.id
                }
            });
            return output
        } else if (lastName != '') {
            const result = _.filter(this.responseData, function (o) { return stringSimilarity.compareTwoStrings(lastName, o.lastname) >= 0.5 });
            const output = _.map(result, function (item) {
                return {
                    "inputFirstName": firstName,
                    "inputLastName": lastName,
                    "possibleFirstName": item.firstname,
                    "possibleLastName": item.lastname,
                    "id": item.id
                }
            });
            return output
        } else {
            return []
        }
    }

    //Function for getting name combining two name filtering functions to use on route
    getAccountByName(firstName = '', lastName = '') {
        if (this.getAccountByFirstOrLastName(firstName, lastName) == '') {
            let output = this.getAccountByBestMatchedFirstOrLastName(firstName, lastName)
            return output
        } else {
            return this.getAccountByFirstOrLastName(firstName, lastName)
        }
    }

    // Remove commas from balance strings and turns them into integers
    getNoCommasAndPutToFloat() {
        const removeCommasFromBalance = _.map(this.responseData, function (item) {
            return { "id": item.id, "balance": parseFloat((item.balance.toString().replace(/,/g, ''))) }
        });
        return removeCommasFromBalance
    }

    // Get account details filtered by amount in balance
    getAccountFilteredByBalance(minAmount = '', maxAmount = '') {
        if (minAmount != '' && maxAmount != '') {
            const filterMinimum = _.filter(this.getNoCommasAndPutToFloat(), function (o) { return o.balance >= minAmount })
            const filtered = _.filter(filterMinimum, function (o) { return o.balance <= maxAmount })
            const sortByMax = _.orderBy(filtered, function (o) { return o.balance })
            return sortByMax.reverse()
        } else if (minAmount != '') {
            const result = _.filter(this.getNoCommasAndPutToFloat(), function (o) { return o.balance >= minAmount });
            const sortByMax = _.orderBy(result, function (o) { return o.balance })
            return sortByMax.reverse()
        } else if (maxAmount != '') {
            const result = _.filter(this.getNoCommasAndPutToFloat(), function (o) { return o.balance <= maxAmount });
            const sortByMax = _.orderBy(result, function (o) { return o.balance })
            return sortByMax.reverse()

        } else {
            return []
        }
    }
}

module.exports = InMemoryApiData;