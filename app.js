const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const contentsRouter = require('./routes/contents');

const PORT = 8080;
const HOST = 127.0.0.1;

var app = express();

// CONNECT TP MONGODB SERVER
const db = mongoose.connection;
db.on('error', console.error);
db.on('open', () => {
    // WHEN CONNECTED
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost/cdp1', { useNewUrlParser: true, useUnifiedTopology: true });

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// SESSION CONFIGUREATION
app.use(session({
  key: 'key',
  secret: 'secret', // encrypt session val
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24000 * 60 * 60 // 24hrs
  }
}));


app.use('/', indexRouter);
app.use('/users', usersRouter, session);
app.use('/contents', contentsRouter);

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
  res.render('error');
});

module.exports = app;
