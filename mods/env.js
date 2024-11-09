const { addMod } = require("@root/submodules/hooks/mods");

const { getEnv } = require("@root/handlers/mods/env");

addMod("get_env", getEnv);
