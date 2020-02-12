"use strict";
const Base = require("./Base");

class Maps extends Base {
  static get tableName() {
    return "maps";
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
        uid: { type: "uuid" },
        title: { type: "string" },
        public: { type: "boolean" },
        is_deleted: { type: "boolean" },
        date_last_accessed: { type: "string" },
        created_at: { type: "string" },
        updated_at: { type: "string" }
      }
    };
  }
}


module.exports = Maps;
