"use strict";
const Boom = require("boom");
const { UniqueViolationError } = require("objection-db-errors");

module.exports = function(app, opts, next) {
  app.get("/", async function(req, reply) {
    try {
      const users = await this.objection.models.user.query();
      return reply.code(200).send(users);
    } catch (err) {
      throw Boom.boomify(err, { message: err.message });
    }
  });

  app.post("/create", async function(req, reply) {
    try {
      const userExists = await this.objection.models.user
        .query()
        .where("username", req.body.username)
        .first();

      if (userExists) {
        throw Boom.badRequest("User already exists");
      }

      const user = await this.objection.models.user
        .query()
        .insert({
          username: req.body.username,
          name: req.body.name
        })
        .first();
      return reply.code(200).send(user);
    } catch (err) {
      if (err instanceof UniqueViolationError) {
        throw Boom.badRequest("User already exists.");
      }
      throw Boom.boomify(err, { messsage: err.message });
    }
  });

  next();
};
