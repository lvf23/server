const { getEnv } = require("@root/utils/env");

let constants;
let loaded = false;

const loadConstants = () => {
  if (loaded) {
    return constants;
  }

  const PORT = getEnv("PORT", 3000);
  const ROUTE_PREFIX = getEnv("ROUTE_PREFIX", "/api/v1");

  constants = { PORT, ROUTE_PREFIX };

  loaded = true;

  return constants;
};

module.exports = {
  loadConstants,
};
