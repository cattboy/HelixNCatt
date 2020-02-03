"use strict";

const fp = require("fastify-plugin");
const Knex = require("knex");

const setupKnex = function(app, opts, next) {
  try {
    const handler = Knex(opts);
    app.decorate("knex", handler);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = fp(setupKnex);
