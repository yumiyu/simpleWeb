var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET users listing. */
router.get('/hello', function(req, res, next) {
  res.send({msg: 'hello', a: 1 });
});


router.use('/test', require('./test'));
router.use('/user', require('./user'));



router.all('*', function(req, res, next) {
  next(createError(404, 'no page'));
});

module.exports = router;
