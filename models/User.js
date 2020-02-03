"use strict";
const Base = require("./Base");

class User extends Base {
  static get tableName() {
    return "users";
  }

  $beforeInsert(context) {
    // super.$beforeInsert(context);
  }

  $beforeUpdate(context) {
    // super.$beforeUpdate(context);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "name"],

      properties: {
        id: { type: "integer" },
        username: { type: "string" },
        name: { type: "string" },
        created_at: { type: "string" },
        updated_at: { type: "string" }
      }
    };
  }
}

module.exports = User;
