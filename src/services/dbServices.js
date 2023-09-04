const Job = require("../models/Job");
const { Op, where } = require("sequelize");

module.exports.getJobsUpdatedLastWeek = async () => {
  const weekDaysNum = 7;
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - weekDaysNum);

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
  return await Job.findByPk(jobId);
};

module.exports.getJobsAroundDate = async (dateParam) => {
  const floorDate = new Date(dateParam);
  floorDate.setHours(floorDate.getHours() - 12);
  const topDate = new Date(dateParam);
  topDate.setHours(topDate.getHours() + 12);

  try {
    const jobs = await Job.findAll({
      where: {
        updateTime: {
          [Op.and]: {
            [Op.gte]: floorDate,
            [Op.lte]: topDate,
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
  const job = await this.getJobByJobId(id);
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

module.exports.getJobsByStatusAndAroundUpdateTime = async (status, date) => {
  try {
    const jobsAroundUpdateTime = await this.getJobsAroundDate(date);
    const jobs = jobsAroundUpdateTime.filter((job) => job.status === status);
    return jobs;
  } catch (e) {
    throw e;
  }
};
