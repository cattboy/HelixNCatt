"use strict";

const fp = require("fastify-plugin");
const { Model } = require("objection");

const setupObj = function(app, opts, next) {
  console.log(app.knex);
  try {
    Model.knex(app.knex);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = fp(setupObj);
