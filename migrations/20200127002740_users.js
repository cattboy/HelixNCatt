exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable("users").then(exists => {
      if (exists) return;
      return knex.schema.createTable("users", t => {
        t.increments("id").primary();
        t.string("username").unique();
        t.string("slug");
        t.string("first_name");
        t.string("last_name");
        t.string("email").unique();
        t.string("password");
        t.string("reset_token");
        t.boolean("is_active").defaultTo(false);
        t.boolean("is_delete").defaultTo(false);
        t.timestamps();
      });
    }),
    knex.schema.hasTable("map_roles").then(exists => {
      if (exists) return;
      return knex.schema.createTable("users", t => {
        t.increments("id").primary();
        t.boolean("is_creator").defaultTo(false);
        t.boolean("can_submit").defaultTo(false);
        t.boolean("can_remove").defaultTo(false);
        t.boolean("can_add_users").defaultTo(false);
        t.boolean("can_remove_users").defaultTo(false);
        t.timestamps();
      });
    }),
    knex.schema.hasTable("user_map_roles").then(exists => {
      if (exists) return;
      return knex.schema.createTable("user_map_roles", t => {
        t.integer("map_id").references("maps.id");
        t.integer("user_id").references("users.id");
        t.integer("role_id").references("map_roles.id");
      });
    }),
    knex.schema.hasTable("maps").then(exists => {
      if (exists) return;
      return knex.schema.createTable("maps", t => {
        t.increments("id").primary();
        t.uuid("uid").unique();
        t.string("title");
        t.boolean("public").defaultTo(true);
        t.boolean("is_deleted").defaultTo(false);
        t.string("date_last_accessed");
      });
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists("users"),
    knex.schema.dropTableIfExists("map_roles"),
    knex.schema.dropTableIfExists("user_map_roles"),
    knex.schema.dropTableIfExists("maps")
  ]);
};
