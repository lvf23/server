const path = require("node:path");

const { runJobs } = require("@root/submodules/hooks/jobs");

const { toJSON } = require("@root/utils/json");

let routePrefix = "";

const startServer = async (port) => {
  await runJobs("start_server", port);
};

const createRoute = async (method, route, handler) => {
  const handlerTools = {
    toJSON,
  };

  await runJobs(
    "create_route",
    method,
    path.posix.join(routePrefix, route),
    handler,
    handlerTools
  );
};

const setRoutePrefix = (prefix) => {
  routePrefix = prefix;
};

module.exports = {
  startServer,
  createRoute,
  setRoutePrefix,
};
