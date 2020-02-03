"use strict";

const fastify = require("fastify");
const config = require("./knexfile");
const User = require("./models/User.js");

const buildApp = function(logger) {
  const app = fastify({
    logger: true
  });

  /* MIDDLEWARE */
  app.register(require("fastify-boom"));
  app.register(require("fastify-objectionjs"), {
    knexConfig: { ...config },
    models: [User]
  });

  app.register(require("./routes/users"), { prefix: "/v1/users" });

  app.get("/", async (request, reply) => {
    reply.send({ message: "hello world" });
  });

  app.get("/models", async function(req, reply) {
    reply.code(204).send();
  });

  return app;
};

module.exports = buildApp;
