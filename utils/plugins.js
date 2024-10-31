const { resolve } = require("node:path");
const { readdirSync, statSync, existsSync } = require("node:fs");

const fetchPlugins = (side) => {
  const pluginFolderPath = resolve(__dirname, "../plugins");
  const pluginFolderEntries = readdirSync(pluginFolderPath);

  const plugins = [];

  pluginFolderEntries.map((entry) => {
    const pluginFolderEntry = resolve(pluginFolderPath, entry);

    if (statSync(pluginFolderEntry).isDirectory()) {
      const packageJsonPath = resolve(pluginFolderEntry, "package.json");
      const pluginFilePath = resolve(pluginFolderEntry, "server.js");
      const pluginFolderPath = resolve(pluginFolderEntry, "server/index.js");

      if (existsSync(packageJsonPath) && statSync(packageJsonPath).isFile()) {
        const packageJson = require(packageJsonPath);

        const { name, version, description } = packageJson;

        let file;

        if (side == "server") {
          if (existsSync(pluginFilePath) && statSync(pluginFilePath).isFile()) {
            file = pluginFilePath;
          } else if (
            existsSync(pluginFolderPath) &&
            statSync(pluginFolderPath).isFile()
          ) {
            file = pluginFolderPath;
          }
        } else if (side == "client") {
          //TODO: do the URL load of client file for frontend
        }

        plugins.push({
          name,
          version,
          description,
          file,
        });
      }
    }
  });

  return plugins;
};

module.exports = {
  fetchPlugins,
};
