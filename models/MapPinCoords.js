"use strict";
const Base = require("./Base");

class MapPinCoords extends Base {
  static get tableName() {
    return "maps_pin_coords";
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
        ingame_coords: { type: "string" },
        created_at: { type: "string" },
        updated_at: { type: "string" }
      }
    };
  }
}

module.exports = MapPinCoords;
