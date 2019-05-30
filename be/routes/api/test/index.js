var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET users listing. */
router.get('/first', function(req, res, next) {
  res.send({msg: 'test_first', a: 1 });
});

router.get('/second', function(req, res, next) {
  res.send({msg: 'test-second', a: 2 });
});


router.all('*', function(req, res, next) {
  next(createError(404, 'no page'));
});

module.exports = router;
