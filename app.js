/* express */
const express = require('express');
const app = express();

/* node_modules */
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
const session = require('express-session');
const store = require("session-file-store")(session);
app.use(session({
  secret: 'My Password Key',
	resave: false, 
	saveUninitialized: true,
	store: new store()
}));  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// initialize
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));


// router
var loginRouter = require('./routes/login');
var adminRouter = require('./routes/admin');
app.use('/', loginRouter);
app.use('/admin', adminRouter);

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
