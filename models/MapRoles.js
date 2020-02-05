"use strict";
const Base = require("./Base");

class MapRoles extends Base {
  static get tableName() {
    return "map_roles";
  }
  $beforeInsert(context) {
    super.$beforeInsert(context);
  }

  $beforeUpdate(context) {
    super.$beforeUpdate(context);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "first_name", "last_name", "email", "password"],

      properties: {
        id: { type: "integer" },
        is_creator: { type: "boolean" },
        can_submit: { type: "boolean" },
        can_remove: { type: "boolean" },
        can_add_users: { type: "boolean" },
        can_remove_users: { type: "boolean" },
        created_at: { type: "string" },
        updated_at: { type: "string" }
      }
    };
  }
}

module.exports = MapRoles;
