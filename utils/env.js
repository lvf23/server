require("dotenv").config();

const { runMods } = require("@root/submodules/hooks/mods");

const getEnv = async (variable, defaultValue) => {
  return await runMods(
    "get_env",
    process.env[variable],
    variable,
    defaultValue
  );
};

module.exports = {
  getEnv,
};
