var express = require('express');
var router = express.Router();
var request = require('request');
var getFromAxios = require('../services/apiServices'),
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
  res.send(stubResponse)
});

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
