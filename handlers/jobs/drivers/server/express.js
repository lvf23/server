const express = require("express");

const { createError } = require("@root/utils/error");

const app = express();

const startServer = (port) => {
  return new Promise((resolve, reject) => {
    app.listen(port, () => {
      resolve();
    });
  });
};

const createRoute = (method, route, handler, handlerTools) => {
  const allowedMethods = ["GET"];

  if (allowedMethods.includes(method)) {
    app.get(route, (req, res) => {
      const handlerResult = handler(handlerTools);
      res.send(handlerResult);
    });
  } else {
    throw createError(`Method '${method}' not allowed.`);
  }
};

module.exports = {
  startServer,
  createRoute,
};
