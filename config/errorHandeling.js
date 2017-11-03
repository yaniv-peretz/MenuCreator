const express = require('express');
const app = global.app;

// catch 404 and forward to error handler.
app.use(function(req, res, next) {
  let err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});


// If our applicatione encounters an error, we'll display the error and stacktrace accordingly.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});
