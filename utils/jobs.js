const { runMods } = require("@root/submodules/hooks/mods");

const loadJobs = () => {
  const serverDriverJobsPath = runMods(
    "server_driver_jobs_path",
    "@root/jobs/drivers/server/express"
  );

  require(serverDriverJobsPath);
};

module.exports = {
  loadJobs,
};
