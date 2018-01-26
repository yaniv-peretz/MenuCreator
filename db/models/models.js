var bookshelf = require('../bookshelf');

var Restaurant = bookshelf.Model.extend({
    tableName: 'restaurants',
    items: function () {
        return this.hasMany(MenuItem);
    }
});

var MenuItem = bookshelf.Model.extend({
    tableName: 'menu-items',
    restaurant: function () {
        return this.belongsTo(Restaurant);
    }
});

module.exports = {
    Restaurant: Restaurant,
    MenuItem: MenuItem
}