const express = require('express'),
  router = express.Router(),
  request = require('request'),
  getFromAxios = require('../services/apiServices'),
  InMemoryApiData = require('../services/inMemoryApiData')
  stubData = require('../stubData/stubData.json'),
  config = require('../config.json')

let stubResponse = stubData.accounts
let baseUrl = config.baseUrl

/* GET home page. */
router.get('/notStub', function (req, res, next) {
  let url = "https://mvf-devtest-s3api.s3-eu-west-1.amazonaws.com/a4a06bb0-3fbe-40bd-9db2-f68354ba742f.json"
  request(url, function (error, response, body) {
    res.header("Content-Type", 'application/json');
    res.send(body)
  });
});

router.get('/', function (req, res) {
  let inMemoryApiData = new InMemoryApiData
  inMemoryApiData.responseData = stubResponse
  res.send(inMemoryApiData.responseData)
});

router.get('/balance/:id', function (req, res) {
  let accountId = req.params.id
  let inMemoryApiData = new InMemoryApiData
  let balance = inMemoryApiData.getAccountHolderBalance(accountId)
  res.send(balance)
});

router.get('/details/:id', function (req, res) {
  let accountId = req.params.id
  let inMemoryApiData = new InMemoryApiData
  let accountDetails = inMemoryApiData.getAccountHolderDetails(accountId)
  res.send(accountDetails)
});

router.get('/overdrawn', function(req, res) {
  let inMemoryApiData = new InMemoryApiData
  let overdrawn = inMemoryApiData.getAccountsOverdrawn()
  res.send(overdrawn)
});

router.get('/customer/details/:id', function (req, res) {
  let accountId = req.params.id
  let inMemoryApiData = new InMemoryApiData
  let accountDetails = inMemoryApiData.getAccountForCustomerView(accountId)
  res.send(accountDetails)

})

module.exports = router;