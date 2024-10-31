const { addMod } = require("@root/submodules/hooks/mods");

const { getEnv } = require("@root/handlers/env");

addMod("get_env", getEnv);
