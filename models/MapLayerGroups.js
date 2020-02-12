"use strict";
const Base = require("./Base");

class MapLayerGroups extends Base {
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
        layer_type_id: { type: "string" },
        points: { type: "string" },
        created_at: { type: "string" },
        updated_at: { type: "string" }
      }
    };
  }


  static get relationMappings() {
    const Roles = require("./Maps");
    return {
      roles: {
        relation: Base.HasOneRelation,
        modelClass: Roles,
        join: {
          from: "maps.id",
          through: {
            from: "maps_layergroups_points_link.maps_layergroups_id",
            to: "maps_layergroups_points_link.maps_layergroups_points_type_id"
          },
          to: "maps_layergroups_points.layer_type_id"
        }
      }
    };
  }
}

module.exports = MapLayerGroups;