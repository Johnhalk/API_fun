const getFromAxios = require("./apiServices"),
    config = require('../config.json')

let baseUrl = config.baseUrl

class InMemoryApiData {
    constructor() {
        this.responseData = []
    }

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
}

module.exports = InMemoryApiData;
