"use strict";
const Base = require("./Base");

class User extends Base {
  static get tableName() {
    return "users";
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
        username: { type: "string" },
        slug: { type: "string" },
        first_name: { type: "string" },
        last_name: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        reset_token: { type: "string" },
        is_active: { type: "boolean" },
        is_delete: { type: "boolean" },
        created_at: { type: "string" },
        updated_at: { type: "string" }
      }
    };
  }

  static get relationMappings() {
    const Roles = require("./MapRoles");
    return {
      roles: {
        relation: Base.HasOneRelation,
        modelClass: Roles,
        join: {
          from: "users.id",
          through: {
            from: "user_map_roles.user_id",
            to: "user_map_roles.role_id"
          },
          to: "map_roles.id"
        }
      }
    };
  }
}

module.exports = User;
