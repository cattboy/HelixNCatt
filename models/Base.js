const { Model } = require("objection");
class Base extends Model {
  $beforeInsert(context) {
    super.$beforeInsert(context);

    const date = new Date();
    this.created_at = date;
    this.updated_at = this.created_at;
  }

  $beforeUpdate(context) {
    super.$beforeUpdate(context);
    this.updated_at = new Date();
  }
}

module.exports = Base;
