"use strict";
const Base = require("./Base");

class MapLayerGroupsPoints extends Base {
  static get tableName() {
    return "maps_layergroups_points";
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
        layer_type: { type: "string" },
        layer_name: { type: "string" },
        layer_type_id: { type: "string" },
        visible: { type: "boolean" },
        created_at: { type: "string" },
        updated_at: { type: "string" }
      }
    };
  }
}

module.exports = MapLayerGroupsPoints;