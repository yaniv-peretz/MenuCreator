
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('menu_items').del()
    .then(() => {
      // Inserts seed entries
      return knex('menu_items').insert([
        { restaurant_id: 1, id: 0, title: 'a', description: 'a', price: '10', sequence: '0' },
        { restaurant_id: 1, id: 0, title: 'b', description: 'b', price: '10', sequence: '1' },
        { restaurant_id: 2, id: 0, title: 'a', description: 'a', price: '10', sequence: '0' },
        { restaurant_id: 2, id: 0, title: 'b', description: 'a', price: '10', sequence: '1' },
        { restaurant_id: 3, id: 0, title: 'Vegan Burger', description: 'portabelo', price: '10', sequence: '0' },
        { restaurant_id: 3, id: 0, title: 'Vegan Pizza', description: 'cashew', price: '20', sequence: '1' },
        { restaurant_id: 3, id: 0, title: 'Tea', description: '', price: '30', sequence: '2' },
        { restaurant_id: 3, id: 0, title: 'Falafel', description: '', price: '40', sequence: '3' },
        { restaurant_id: 3, id: 0, title: 'Humus', description: 'portabelo', price: '50', sequence: '4' },
      ]);
    });
};
