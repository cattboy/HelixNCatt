"use strict";
const Base = require("./Base");

class MapPinTypes extends Base {
  static get tableName() {
    return "maps_pin_types";
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
        resource_type: { type: "string" },
        resource_sub_type: { type: "string" },
        resource_name: { type: "string" },
        icon_img_dir: { type: "string" },
        icon_default_color: { type: "string" },
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
            from: "maps_pins_link.maps_pin_types_id",
            to: "maps_pins_link.maps_pin_coords_id"
          },
          to: "maps_pin_coords.id"
        }
      }
    };
  }
}


module.exports = MapPinTypes;
