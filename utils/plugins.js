const path = require("node:path");

const {
  isFolder,
  folderExists,
  fileExists,
  readFolder,
} = require("@root/utils/fs");

const { isSet } = require("@root/utils/vars");

const fetchAutoloadPlugins = (side) => {
  const pluginFolderPath = path.resolve(__dirname, "../autoload-plugins");
  const pluginFolderEntries = readFolder(pluginFolderPath);

  const plugins = [];

  pluginFolderEntries.map((entry) => {
    const pluginFolderEntry = path.join(pluginFolderPath, entry);

    const pluginJsonPath = path.join(pluginFolderEntry, "plugin.json");

    if (isFolder(pluginFolderEntry) && fileExists(pluginJsonPath)) {
      const pluginJson = require(pluginJsonPath);
      const defaultPluginServerFile = path.join(pluginFolderEntry, "server.js");
      const defaultPluginServerFolderFile = path.join(
        pluginFolderEntry,
        "server/index.js"
      );

      const plugin = {};

      if (pluginJson.name) {
        plugin.name = pluginJson.name;
      }

      if (isSet(pluginJson.active)) {
        plugin.active = pluginJson.active;
      } else {
        plugin.active = true;
      }

      if (side == "server") {
        if (pluginJson.server) {
          plugin.server = pluginJson.server;
        } else if (fileExists(defaultPluginServerFile)) {
          plugin.server = defaultPluginServerFile;
        } else if (fileExists(defaultPluginServerFolderFile)) {
          plugin.server = defaultPluginServerFolderFile;
        }
      }

      plugins.push(plugin);
    }
  });
  return plugins;
};

module.exports = {
  fetchAutoloadPlugins,
};
