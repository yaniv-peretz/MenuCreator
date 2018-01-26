const knex = require(`${__dirname}/knex.js`);
const bookshelf = require('bookshelf')(knex);
// bookshelf.plugin('registry')
// bookshelf.plugin('virtuals');
// bookshelf.plugin('pagination');
module.exports = bookshelf;
