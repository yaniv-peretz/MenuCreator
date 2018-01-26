const environment = process.env.NODE_ENV || 'development';
const config = require(`../knexfile.js`);
const knex = config[environment];
module.exports = require('knex')(knex);