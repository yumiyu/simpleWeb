var createError = require('http-errors');
var express = require('express');
var history = require('connect-history-api-fallback');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var yumiRouter = require('./routes/yumi');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api', require('./routes/api'));
app.use(history());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../','fe','dist')));


// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/yumi', yumiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({msg: err.message})
  // res.render('error');
});

module.exports = app;

const mongoose = require('mongoose')
const User = require('./models/users')

mongoose.connect('mongodb://localhost:27017/nemv', { useNewUrlParser: true }, (err) => {
  if (err) return console.error(err)
  console.log('mongoose connected!')
  // User.deleteMany()
  //   .then(r => console.log(r))
  //   .catch(e => console.error(e))
})

// const userSchema = new mongoose.Schema({
//   name: { type: String, default: '' },
//   age: { type: Number, default: 1 }
// })

// const User = mongoose.model('User', userSchema)

// User.create({ name: 'three', age: 30})
//   .then(r => console.log(r))
//   .catch(e => console.error(e))

// User.updateOne({ _id: '5cda8a58dea4bfe10017ab99'}, { $set: { name: 'yumiyu'} })
//   .then(r => {
//     console.log(r)
//     console.log('updated')
//     return User.find()
//    } )
//   .then(r => console.log(r))
//   .catch(e => console.error(e))

// User.deleteOne({name: 'yumiyu'})
//   .then(r => console.log(r))
//   .catch(e => console.error(e))

User.find()
  .then(r => console.log(r))
  .catch(e => console.error(e))