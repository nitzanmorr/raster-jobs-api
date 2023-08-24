const express = require("express");
const {
  getJobsUpdatedLastWeek,
  getAllUncompleted,
  getJobByJobId,
  getJobsAroundDate,
  updateJobStatus,
  getJobsCreatedBeforeDate,
  getJobsCreatedAfterDate,
  getJobsByStatusAndAroundUpdateTime,
} = require("../services/dbServices");
const { statuses } = require("../types/JobStatusEnum");

const router = express.Router();
router.use(express.json());

router.get("/jobs/updated-last-week", async (req, res, next) => {
  // #swagger.summary = "Returns all jobs that were updated last week"
  try {
    const updatedLastWeek = await getJobsUpdatedLastWeek();
    res.send(updatedLastWeek);
  } catch (e) {
    next(e);
  }
});

router.get("/jobs/uncompleted", async (req, res, next) => {
  // #swagger.summary = "Returns all uncompleted jobs"
  try {
    const uncompleted = await getAllUncompleted();
    res.send(uncompleted);
  } catch (e) {
    next(e);
  }
});

router.get("/job/:id", async (req, res, next) => {
  // #swagger.summary = "Returns a job by id (path parameter)"
  try {
    const job = await getJobByJobId(req.params.id);
    res.send(job);
  } catch (e) {
    next(e);
  }
});

router.get("/jobs/updated-around/:date", async (req, res, next) => {
  // #swagger.summary = "Returns all jobs that were updated 24 hours around a date (path parameter)"
  const date = req.params.date;
  if (date) {
    try {
      const jobs = await getJobsAroundDate(date);
      res.send(jobs);
    } catch (e) {
      next(e);
    }
  } else {
    throw new Error("Date cannot be empty");
  }
});

router.patch("/job/update-status-by-id", async (req, res, next) => {
  /* #swagger.summary = "Updates the status of a job (by id)"
    #swagger.parameters[status] = {
        in: 'query',
        description: 'new status',
        schema: {
            '@enum': ['In-Progress', 'Completed', 'Aborted']
        }
    }*/

  const id = req.query.id;
  const status = req.query.status;
  if (id) {
    if (statuses.includes(status)) {
      try {
        const job = await updateJobStatus(id, status);
        res.status(204);
        res.send(job);
      } catch (e) {
        next(e);
      }
    } else {
      next(
        new Error(
          "status must be one of the following: 'In-Progress', 'Completed', 'Aborted'"
        )
      );
    }
  } else {
    throw new Error("id cannot be empty");
  }
});

router.get("/jobs/before/:date", async (req, res) => {
  // #swagger.summary = "Returns all jobs that were created before a date (path parameter)"
  const date = req.params.date;
  try {
    const jobs = await getJobsCreatedBeforeDate(date);
    res.send(jobs);
  } catch (e) {
    next(e);
    New;
  }
});

router.get("/jobs/after/:date", async (req, res, next) => {
  // #swagger.summary = "Returns all jobs that were created after a date (path parameter)"
  const date = req.params.date;
  try {
    const jobs = await getJobsCreatedAfterDate(date);
    res.send(jobs);
  } catch (e) {
    next(e);
  }
});

router.get("/jobs/around-update-time-and-status", async (req, res, next) => {
  /* #swagger.summary = "Returns all jobs that were updated around a date and matches a status"
  #swagger.parameters[status] = {
    in: 'query',
    description: '',
    schema: {
        '@enum': ['In-Progress', 'Completed', 'Aborted']
    }
}*/
  const status = req.query.status;
  const date = req.query.date;

  try {
    const jobs = await getJobsByStatusAndAroundUpdateTime(status, date);
    res.send(jobs);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
