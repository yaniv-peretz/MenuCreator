const bookshelf = require('../bookshelf');
const knex = require(`../knex.js`);

var Restaurant = bookshelf.Model.extend({
    tableName: 'restaurants',
    idAttribute: 'id',
    items: function () {
        return this.hasMany(MenuItem);
    },
});

var MenuItem = bookshelf.Model.extend({
    tableName: 'menu_items',
    idAttribute: 'id',
    restaurant: function () {
        return this.belongsTo(Restaurant);
    },
    addItem: function () {
        const { restaurant_id, title, description, price, sequence } = this.attributes;
        return knex.raw(
            `UPDATE menu_items
            SET sequence = sequence + 1
            WHERE restaurant_id=${restaurant_id}
            AND sequence>=${sequence}`
        ).then(() => {
            return knex.raw(
                `INSERT INTO menu_items 
                (restaurant_id, title, description, price, sequence)
                 VALUES (${restaurant_id}, '${title}', '${description}', ${price}, ${sequence})`
            )
        }).then(result => {
            const id = result[0].insertId;
            return id;
        }).catch(err => {
            console.error(err);
        });
    },
    removeItem: function () {
        const { restaurant_id, id } = this.attributes;
        return knex.raw(
            `SELECT sequence 
            FROM menu_items 
            WHERE restaurant_id=${restaurant_id} AND id=${id}`
        ).then(result => {
            let sequence = result[0][0].sequence;
            return knex.raw(
                `UPDATE menu_items 
                SET sequence = sequence - 1 
                WHERE restaurant_id=${restaurant_id} AND sequence > ${sequence}`
            )
        }).then(result => {
            return knex.raw(
                `DELETE FROM menu_items
                 WHERE restaurant_id=${restaurant_id} AND id=${id}`
            )
        }).then(() => {
            return true;
        }).catch(err => {
            console.error(err);
            return false;
        });
    }
});
module.exports = {
    Restaurant: Restaurant,
    MenuItem: MenuItem
}