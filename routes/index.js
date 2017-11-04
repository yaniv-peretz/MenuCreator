const express = require('express');
const app = express();

var route = require('./login.js');
app.use('/login', route);
var route = require('./menu.js');
app.use('/menu', route);
var route = require('./menu-item.js');
app.use('/menu-item', route);

module.exports = app;
