var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
const linkRouter = require('./routes/linkRoutes')
const authRoutes = require('./routes/authRoutes')
const cors = require('cors')
var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', authRoutes)
app.use('/', linkRouter)

module.exports = app;
