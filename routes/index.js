const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//creates a api path for each file - each file path will be /api/filename
const apiFolder = `${__dirname}/api`;
fs.readdir(apiFolder, (err, files) => {
    files.forEach(file => {
        let fileName = file.split(".");
        let name = '/' + fileName[0];
        var route = require(`${apiFolder}/${file}`);
        app.use(name, route);
    });
})

module.exports = app;
