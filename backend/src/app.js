const department = require('./routers/department.router');
const overtime = require('./routers/overtime.router');
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const user = require('./routers/user.router');

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// v1 api routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/department', department);
app.use('/api/overtime', overtime);
app.use('/api/user', user);
app.use('/', express.static('public/upload'));
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
// app.use(errorConverter);

// handle error
// app.use(errorHandler);

module.exports = app;
