const getEnv = (value, variable, defaultValue) => {
  return value ?? defaultValue;
};

module.exports = {
  getEnv,
};
