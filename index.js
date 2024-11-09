require("module-alias/register");

const { loadConstants } = require("@root/utils/constants");

const { loadPlugins } = require("@root/submodules/hooks/plugins");
const { runMods } = require("@root/submodules/hooks/mods");

const { fileExists } = require("@root/utils/fs");

const { fetchAutoloadPlugins } = require("@root/utils/plugins");
const {
  startServer,
  createRoute,
  setRoutePrefix,
} = require("@root/utils/server");

const { loadJobs } = require("@root/utils/jobs");
const { loadMods } = require("@root/utils/mods");

const main = async () => {
  loadPlugins(fetchAutoloadPlugins("server"), (plugin) => {
    if (fileExists(plugin.server) && plugin.active === true) {
      require(plugin.server);
    }
  });

  loadJobs();
  loadMods();

  const { PORT, ROUTE_PREFIX } = loadConstants();

  setRoutePrefix(ROUTE_PREFIX);

  await createRoute("GET", "/teste", () => {
    return {
      foo: "bar",
    };
  });

  await startServer(PORT);

  const defaultServerStartMessage = `Server listening on port: ${PORT}`;

  const serverStartMessage = runMods(
    "start_server_message",
    defaultServerStartMessage,
    PORT
  );

  console.log(serverStartMessage);
};

main();
