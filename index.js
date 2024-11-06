require("module-alias/register");

const { loadPlugins } = require("@root/submodules/hooks/plugins");
const { runMods } = require("@root/submodules/hooks/mods");

const { fetchPlugins } = require("@root/utils/plugins");
const {
  startServer,
  createRoute,
  setRoutePrefix,
} = require("@root/utils/server");

const { loadJobs } = require("@root/utils/jobs");
const { loadMods } = require("@root/utils/mods");

const { PORT, ROUTE_PREFIX } = require("@root/utils/constants");

const main = async () => {
  loadPlugins(fetchPlugins("server"), (plugin) => {
    require(plugin.file);
  });

  loadJobs();
  loadMods();

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
