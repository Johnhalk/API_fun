const express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  bodyParser = require('body-parser')

const index = require('./routes/index')

const app = express();
const port = process.env.PORT || 3000;

//Swagger setup for API
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');
app.use('/swagger-api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Port configuration
app.set(port)
app.listen(app.get('port'),
  function () {
    console.log("Express server listening on port " + app.get('port'));
  });

// view engine setup - set up to EJS for html rendering
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes defined for api
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  { console.log("backend app started") }

});

module.exports = app;
