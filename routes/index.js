const express = require('express');
const app = express();

var route = require('./api/login.js');
app.use('/login', route);
var route = require('./api/rest-name.js');
app.use('/rest-name', route);
var route = require('./api/menu.js');
app.use('/menu', route);
var route = require('./api/menu-item.js');
app.use('/menu-item', route);

// for test only
// var route = require('./api/SetTestAuth.js');
// app.use('/setTest', route);

module.exports = app;
