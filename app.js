require('dotenv').config();
require('./db');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// Routers require
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const dressRouter = require('./routes/dress');
const reviewsRouter = require('./routes/reviews')
const postRouter = require('./routes/post')
const profileRouter = require('./routes/profile')
const messageRouter = require('./routes/message')

const app = express();

// cookies and loggers
app.use(cors({
  origin: process.env.ORIGIN
}));
app.set('trust proxy', 1);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// routes intro
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/dress', dressRouter);
app.use('/reviews', reviewsRouter);
app.use('/post', postRouter)
app.use('/profile', profileRouter)
app.use('/message', messageRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if (err.status === 404) {
    res.status(err.status || 404);
  } else {
    res.status(err.status || 500);
  }
});




module.exports = app;
