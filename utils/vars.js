const isSet = (variable) => {
  return typeof variable !== "undefined" && variable !== null;
};

module.exports = {
  isSet,
};
