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
                this.responseData = this.responseData.concat(response.data.accounts)
            }
            )
            .catch(
            error => {
                throw new Error(`ERROR retrieving data `, error);
            }
            );
    };

    // Filters over data and returns IDs of accounts who are in debt.
    getAccountsInDebt() {
        this.responseData = stubData.accounts
        const accountsInDebt = _.filter(this.responseData, function (o) { return o.balance <= 0});
        const output = _.mapValues(accountsInDebt, function (item) {
            return item.id
        });
        return output
    }
}

module.exports = InMemoryApiData;
