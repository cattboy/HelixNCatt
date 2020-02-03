exports.up = function(knex) {
  return knex.schema.hasTable("users").then(exists => {
    if (exists) return;
    return knex.schema.createTable("users", t => {
      t.increments("id").primary();
      t.string("username").unique();
      t.string("name");
      t.timestamps();
    });
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
