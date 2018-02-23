const getFromAxios = require("./apiServices"),
    stubData = require("../stubData/stubData.json"),
    config = require('../config.json'),
    _ = require('lodash');

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
        })
        return output
    }

    // Gets an accounts details based on specific account guid
    getAccountHolderDetails(accountId) {
        const userAccount = _.filter(this.responseData, function (o) { return o.id == accountId });
        const output = _.map(userAccount, function (item) {
            return { "First Name": item.firstname, "Last Name": item.lastname, "Email": item.email, "Telephone": item.telephone }
        })
        return output

    }

    // Filters over data and returns IDs of accounts who are in debt.
    getAccountsOverdrawn() {
        const accountsInDebt = _.filter(this.responseData, function (o) { return o.balance <= 0 });
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
        })
        return output

    }
}

module.exports = InMemoryApiData;
