const Job = require("../models/Job");
const { Op } = require("sequelize");

module.exports.getJobsUpdatedLastWeek = async () => {
  let weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const jobs = await Job.findAll({
    where: {
      updateTime: {
        [Op.gt]: weekAgo,
      },
    },
  });
  return jobs;
};

module.exports.getAllUncompleted = async () => {
  const uncompletedLayers = await Job.findAll({
    where: {},
  });
};
