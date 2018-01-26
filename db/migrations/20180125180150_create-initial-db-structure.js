
exports.up = (knex, Promise) => {
    return knex.schema
        .createTable('restaurants', table => {
            table.increments();
            table.string('email').notNullable();
            table.string('password').notNullable();
            table.string('name').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        .createTable('menu_items', table => {
            table.integer('restaurant_id').unsigned();
            table.increments();
            table.string('title').notNullable();
            table.string('description').notNullable();
            table.integer('price').notNullable();
            table.integer('sequence').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table.foreign('restaurant_id').references('restaurants.id');
        })
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTable('menu_items')
        .dropTable('restaurants')
};
