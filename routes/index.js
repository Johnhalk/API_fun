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

//GET initial customer base data
router.get('/', async function (req, res) {
  await inMemoryApiData.getDataFromApi(customerId)
  res.send(inMemoryApiData.responseData)
});

//GET new customer data based on customer guid
router.get('/:customerid', async function (req, res) {
  customerId = req.params.customerid
  await inMemoryApiData.getDataFromApi(customerId)
  res.send(inMemoryApiData.responseData)
});

//GET account balance based on accountID
router.get('/balance/:accountId', async function (req, res) {
  let accountId = req.params.accountId
  await inMemoryApiData.getDataFromApi(customerId)
  let balance = inMemoryApiData.getAccountHolderBalance(accountId)
  res.send(balance)
});

//GET account details based on accountID
router.get('/details/:accountId', async function (req, res) {
  let accountId = req.params.accountId
  await inMemoryApiData.getDataFromApi(customerId)
  let accountDetails = inMemoryApiData.getAccountHolderDetails(accountId)
  res.send(accountDetails)
});

//GET account data whose balance is overdrawn
router.get('/accounts/overdrawn', async function (req, res) {
  await inMemoryApiData.getDataFromApi(customerId)
  let overdrawn = inMemoryApiData.getAccountsOverdrawn()
  res.send(overdrawn)
});

//GET account details for a customer view
router.get('/customer/details/:accountid', async function (req, res) {
  let accountId = req.params.accountid
  await inMemoryApiData.getDataFromApi(customerId)
  let accountDetails = inMemoryApiData.getAccountForCustomerView(accountId)
  res.send(accountDetails)

});

//GET account details based on firstname and or lastname
router.get('/customer/account', async function (req, res) {
  let firstName = req.query.firstname
  let lastName = req.query.lastname
  await inMemoryApiData.getDataFromApi(customerId)
  let accounts = inMemoryApiData.getAccountByFirstOrLastName(firstName, lastName)
  res.send(accounts)
});

//GET account details whose balance is filtered by a min amount and max amount
router.get('/customer/account/balance', async function (req, res) {
  let minAmount = req.query.minamount
  let maxAmount = req.query.maxamount
  await inMemoryApiData.getDataFromApi(customerId)
  let balanceFilter = inMemoryApiData.getAccountFilteredByBalance(minAmount, maxAmount)
  res.send(balanceFilter)
})

module.exports = router;