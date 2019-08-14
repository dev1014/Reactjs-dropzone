var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/createfile', async (req, res) => {
  console.log("req: ", req.body);
  let result = await writeJson(req.body).catch(err => {
    res.json({status: 'failure'});
  })
  
  res.json({status:"success"});
});

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

const writeJson = (data) => {
  data = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fs.writeFile('./json_files/output.json', data, 'utf8', (err) => {
      if (err) {
        reject(err);
      }
      resolve("success");
    });
  });
}

module.exports = app;
