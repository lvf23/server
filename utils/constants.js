const { getEnv } = require("@root/utils/env");

const PORT = getEnv("PORT", 3000);
const ROUTE_PREFIX = getEnv("ROUTE_PREFIX", "/api/v1");

module.exports = {
  PORT,
  ROUTE_PREFIX,
};
