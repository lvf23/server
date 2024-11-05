require("dotenv").config();

const { runMods } = require("@root/submodules/hooks/mods");

const getEnv = (variable, defaultValue) => {
  return runMods("get_env", process.env[variable], variable, defaultValue);
};

module.exports = {
  getEnv,
};
