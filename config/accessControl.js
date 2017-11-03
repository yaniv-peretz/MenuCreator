const express = require('express');
const bodyParser = require('body-parser');
const app = global.app;

app.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
