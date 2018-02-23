const express = require('express'),
  router = express.Router(),
  request = require('request'),
  getFromAxios = require('../services/apiServices'),
  InMemoryApiData = require('../services/inMemoryApiData'),
  stubData = require('../stubData/stubData.json'),
  config = require('../config.json')

let stubResponse = stubData.accounts
let baseUrl = config.baseUrl
let inMemoryApiData = new InMemoryApiData
let customerId = config.baseCustomerId

router.get('/', async function (req, res) {
  await inMemoryApiData.getDataFromApi(customerId)
  res.send(inMemoryApiData.responseData)
});

router.get('/:customerid', async function (req, res) {
  customerId = req.params.customerid
  await inMemoryApiData.getDataFromApi(customerId)
  res.send(inMemoryApiData.responseData)
});

router.get('/balance/:accountId', async function (req, res) {
  await inMemoryApiData.getDataFromApi(customerId)
  let accountId = req.params.accountId
  let balance = inMemoryApiData.getAccountHolderBalance(accountId)
  res.send(balance)
});

router.get('/details/:accountId', async function (req, res) {
  await inMemoryApiData.getDataFromApi(customerId)
  let accountId = req.params.accountId
  let accountDetails = inMemoryApiData.getAccountHolderDetails(accountId)
  res.send(accountDetails)
});

router.get('/accounts/overdrawn', async function (req, res) {
  await inMemoryApiData.getDataFromApi(customerId)
  let overdrawn = inMemoryApiData.getAccountsOverdrawn()
  res.send(overdrawn)
});

router.get('/customer/details/:id', async function (req, res) {
  let accountId = req.params.id
  await inMemoryApiData.getDataFromApi(customerId)
  let accountDetails = inMemoryApiData.getAccountForCustomerView(accountId)
  res.send(accountDetails)

})

module.exports = router;