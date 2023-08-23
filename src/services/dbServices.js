const Job = require("../models/Job");
const { Op, where } = require("sequelize");

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
  const uncompletedJobs = await Job.findAll({
    where: {
      status: {
        [Op.not]: "Completed",
      },
    },
  });
  return uncompletedJobs;
};

module.exports.getJobByJobId = async (jobId) => {
  const jobs = await Job.findByPk(jobId);
  return jobs;
};

module.exports.getJobsAroundDate = async (dateParam) => {
  const floorDate = new Date(dateParam);
  floorDate.setHours(floorDate.getHours() - 12);
  const ceilingDate = new Date(dateParam);
  ceilingDate.setHours(ceilingDate.getHours() + 12);

  try {
    const jobs = await Job.findAll({
      where: {
        updateTime: {
          [Op.and]: {
            [Op.gte]: floorDate,
            [Op.lte]: ceilingDate,
          },
        },
      },
    });
    return jobs;
  } catch (e) {
    throw e;
  }
};

module.exports.updateJobStatus = async (id, status) => {
  const job = await Job.findByPk(id);
  const updatedJob = await job.update({ status: status });
  await updatedJob.save();
  return updatedJob;
};

module.exports.getJobsCreatedBeforeDate = async (date) => {
  const jobs = await Job.findAll({
    where: {
      creationTime: {
        [Op.lt]: date,
      },
    },
  });
  return jobs;
};

module.exports.getJobsCreatedAfterDate = async (date) => {
  const jobs = await Job.findAll({
    where: {
      creationTime: {
        [Op.gt]: date,
      },
    },
  });
  return jobs;
};
