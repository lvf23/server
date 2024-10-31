require("module-alias/register");

const { loadPlugins } = require("@root/submodules/hooks/plugins");
const { runMods } = require("@root/submodules/hooks/mods");

const { getEnv } = require("@root/utils/env");
const { fetchPlugins } = require("./utils/plugins");
const { startServer, createRoute, setRoutePrefix } = require("./utils/server");

const { loadJobs } = require("@root/utils/jobs");
const { loadMods } = require("@root/utils/mods");

const main = async () => {
  await loadPlugins(fetchPlugins("server"), (plugin) => {
    require(plugin.file);
  });

  await loadJobs();
  loadMods();

  const port = await getEnv("PORT", 3000);

  setRoutePrefix("/api/v1");

  await createRoute("GET", "/teste", ({ toJSON }) => {
    return toJSON({
      foo: "bar",
    });
  });

  await startServer(port);

  const defaultServerStartMessage = `Server listening on port: ${port}`;

  const serverStartMessage = await runMods(
    "start_server_message",
    defaultServerStartMessage,
    port
  );

  console.log(serverStartMessage);
};

main();
