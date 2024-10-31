const { runMods } = require("@root/submodules/hooks/mods");

const loadJobs = async () => {
  const serverDriverJobsPath = await runMods(
    "server_driver_jobs_path",
    "@root/jobs/drivers/server/express"
  );

  require(serverDriverJobsPath);
};

module.exports = {
  loadJobs,
};
