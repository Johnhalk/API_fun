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
  let data = inMemoryApiData.responseData = stubResponse
  res.send(data)
});

router.get('/overdrawn', function(req, res) {
  let inMemoryApiData = new InMemoryApiData
  let overdrawn = inMemoryApiData.getAccountsInDebt()
  res.send(overdrawn)
})

router.get('/balance/:id', function (req, res) {
  let id = req.params.id
  let userId = stubResponse.filter(r => r.id === id)[0];
  let result = { "balance": userId.balance }

  if (!result) {
    res.sendStatus(404);
  } else {
    res.send(result);
  }
});

router.get('/details/:id', function (req, res) {
  let id = req.params.id
  let userId = stubResponse.filter(r => r.id === id)[0];
  let result = { "First Name": userId.firstname, "Last Name": userId.lastname, "Email": userId.email, "Telephone": userId.telephone }

  if (!result) {
    res.sendStatus(404);
  } else {
    res.send(result);
  }
});

module.exports = router;

// router.get('/:customerid', function (req, res) {
//   let customerId = req.params.customerid
//   let url = baseUrl + customerId + ".json"
//   request(url, function (error, response, body) {
//     res.header("Content-Type", 'application/json');
//     res.send(body)
//   });
// });

// router.get('/:customerid/balance/:accountid', function (req, res) {
//   let accountId = req.params.accountid
//   let userId = data.accounts.filter(r => r.id === accountId)[0];
//   let result = { "balance": userId.balance }

//   if (!result) {
//     res.sendStatus(404);
//   } else {
//     res.send(result);
//   }
// });


// router.param('customerid', function (req, res, next, customerid) {
//   let customerId = req.params.customerid
//   let url = baseUrl + customerId + ".json"
//   request(url, function (error, customerid) {
//     res.header("Content-Type", 'application/json');
//     req.customerId = customerId
//     next()
//   });
// });