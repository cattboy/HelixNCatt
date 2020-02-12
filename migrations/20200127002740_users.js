exports.up = function (knex, Promise) {
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
        t.boolean("public").defaultTo(true);        //public or private map
        t.boolean("is_deleted").defaultTo(false);   //map was deleted from use, now offline
        t.string("date_last_accessed");
        t.boolean("can_expire").defaultTo(false);   //future proof, if we have custom maps per each server, we dont want them to delete
      });
    }),
    knex.schema.hasTable("maps_pin_types").then(exists => {
      if (exists) return;
      return knex.schema.createTable("maps_pin_types", t => {
        t.increments("id").primary();
        t.string("resource_type").unique();      //   eg  "resource_mining",    "resource_lumberjacking", 
        t.string("resource_sub_type").unique();  //   "resource_crystal"  "resource_wyrdwood": 
        t.string("resource_name").unique();     //        "Crystal",            "Wyrdwood",
        t.string("icon_img_dir")        //Location of custom icon
        t.string("icon_default_color")  //Default color to use
      });
    }),
    knex.schema.hasTable("maps_pin_coords").then(exists => {
      if (exists) return;
      return knex.schema.createTable("maps_pin_coords", t => {
        t.increments("id").primary();
        //What else to store with the pins
        //Maybe we link this by the resource_type because we want to grab ALL of the resource coords for that type
        t.string("ingame_coords");      //Stored as " [61.822783, 47.202984] "  which is [X.x, Y.y]
      });
    }),
    knex.schema.hasTable("maps_pins_link").then(exists => {
      if (exists) return;
      return knex.schema.createTable("maps_pins_link", t => {
        t.integer("map_id").references("maps.id");
        t.integer("maps_pin_types_id").references("maps_pin_types_id.id");
        t.integer("maps_pin_coords_id").references("maps_pin_coords.id");
      });
    }),
    knex.schema.hasTable("maps_layergroups").then(exists => {
      if (exists) return;
      return knex.schema.createTable("maps_layergroups", t => {
        t.increments("id").primary();
        t.string("layer_type").unique();     //polygon / multiplolygon /multipoint
        t.string("layer_name"); 
        t.string("layer_type_id").unique();     /// links all  points in maps_layergroups_coords, for that type
        t.boolean("visible").defaultTo(true);  //will it show on the map
      });
    }),
    knex.schema.hasTable("maps_layergroups_points").then(exists => {
      if (exists) return;
      return knex.schema.createTable("maps_layergroups_points", t => {
        t.increments("id").primary();
        t.string("layer_type_id").unique();     /// unique, linking to the maps_layergroups
        t.string("points");      //Stored as " { lat: 1.822783, lng: 7.202984 },  "
      });
    }),
    knex.schema.hasTable("maps_layergroups_points_link").then(exists => {
      if (exists) return;
      return knex.schema.createTable("maps_layergroups_points_link", t => {
        t.integer("map_id").references("maps.id");
        t.integer("maps_layergroups_id").references("maps_layergroups.id");
        t.string("maps_layergroups_points_type_id").references("maps_layergroups_points.layer_type_id");
      });
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists("users"),
    knex.schema.dropTableIfExists("map_roles"),
    knex.schema.dropTableIfExists("user_map_roles"),
    knex.schema.dropTableIfExists("maps"),
    knex.schema.dropTableIfExists("maps_pin_types"),
    knex.schema.dropTableIfExists("maps_pins_link"),
    knex.schema.dropTableIfExists("maps_layergroups"),
    knex.schema.dropTableIfExists("maps_layergroups_points"),
    knex.schema.dropTableIfExists("maps_layergroups_points_link")
  ]);
};