const fs = require("fs");

const direntExists = (path) => {
  return fs.existsSync(path);
};

const isFolder = (path) => {
  return fs.statSync(path).isDirectory();
};

const readFolder = (path) => {
  return fs.readdirSync(path);
};

const folderExists = (path) => {
  return direntExists(path) && isFolder(path);
};

const fileExists = (path) => {
  return direntExists(path) && fs.statSync(path).isFile();
};

module.exports = {
  direntExists,
  isFolder,
  readFolder,
  folderExists,
  fileExists,
};
