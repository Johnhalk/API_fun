var express = require('express');
var router = express.Router();
var request = require('request');
var getFromAxios = require('../services/apiServices'),
  stubData = require('../stubData/stubData.json')

let stubResponse = stubData

/* GET home page. */
router.get('/', function (req, res, next) {
  let url = "https://mvf-devtest-s3api.s3-eu-west-1.amazonaws.com/a4a06bb0-3fbe-40bd-9db2-f68354ba742f.json"
  request(url, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred and handle it
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    res.send(body)
  });
});

router.get('/stub', function (req, res) {
  res.send(stubResponse)
});

router.get('/stub/:id', function (req, res) {
  var id = req.params.id
  var result = stubData.accounts.filter(r => r.id === id)[0];

  if (!result) {
    res.sendStatus(404);
  } else {
    res.send(result);
  }
});

module.exports = router;
