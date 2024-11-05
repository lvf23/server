const path = require("node:path");

const { runJobsAsync } = require("@root/submodules/hooks/jobs");
const { runMods } = require("@root/submodules/hooks/mods");

const { toJSON } = require("@root/utils/json");

let routePrefix = "";

const startServer = async (port) => {
  await runJobsAsync("start_server", port);
};

const createRoute = async (method, route, handler) => {
  const handlerTools = {
    toJSON,
  };

  await runJobsAsync(
    "create_route",
    method,
    path.posix.join(routePrefix, route),
    handler,
    handlerTools
  );
};

const setRoutePrefix = (prefix) => {
  routePrefix = runMods("set_route_prefix", prefix);
};

module.exports = {
  startServer,
  createRoute,
  setRoutePrefix,
};
