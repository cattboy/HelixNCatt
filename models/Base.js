const { Model } = require("objection");
class Base extends Model {
  $beforeInsert(context) {
    super.$beforeInsert(context);

    const date = new Date();
    this.created_at = date;
  }

  $beforeUpdate(context) {
    super.$beforeUpdate(context);

    const date = new Date();
    this.updated_at = date;
  }
}

module.exports = Base;
