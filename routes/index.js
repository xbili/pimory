var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { 
    title: 'Pimory'
  });
});

router.get('/pi-answer', function(req, res) {
  var count = 0;
  var pi;

  // New file stream that reads PI 5 digits at a time, 2 bytes per char
  fs.readFile('pi.txt', 'utf8', function(err, data) {
    if (err) console.log(err);
    pi = data;

    res.send(pi);
  });
});

module.exports = router;
