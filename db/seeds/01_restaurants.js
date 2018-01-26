
exports.seed = function(knex, Promise) {
  return knex('restaurants')
    .then(function () {
      // Inserts seed entries
      return knex('restaurants').insert([
        {email: 'a', password: 'a', name: 'a test'},
        {email: 'b', password: 'b', name: 'b test'},
        {email: 'test', password: '1234', name: 'Example Restaurant'},
      ]);
    });
};
