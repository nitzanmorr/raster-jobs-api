const express = require("express");
const {
  getJobsUpdatedLastWeek,
  getAllUncompleted,
  getJobByJobId,
  getJobsAroundDate,
  updateJobStatus,
  getJobsCreatedBeforeDate,
  getJobsCreatedAfterDate,
} = require("../services/dbServices");
const { statuses } = require("../types/JobStatusEnum");

const router = express.Router();
router.use(express.json());

router.get("/jobs/updated-last-week", async (req, res) => {
  const updatedLastWeek = await getJobsUpdatedLastWeek();
  res.send(updatedLastWeek);
});

router.get("/jobs/uncompleted", async (req, res) => {
  const uncompleted = await getAllUncompleted();
  res.send(uncompleted);
});

router.get("/job/:id", async (req, res) => {
  const job = await getJobByJobId(req.params.id);
  res.send(job);
});

router.get("/jobs/updated-around-parameter/:date", async (req, res) => {
  const date = req.params.date;
  if (date) {
    const jobs = await getJobsAroundDate(date);
    res.send(jobs);
  } else {
    throw new Error("Date cannot be empty");
  }
});

router.patch("/job/update-status-by-id", async (req, res) => {
  const id = req.query.id;
  const status = req.query.status;
  if (id) {
    if (statuses.includes(status)) {
      const job = updateJobStatus(id, status);
      res.send(job);
    } else {
      throw new Error(
        "status must be one of the following: 'In-Progress', 'Completed', 'Aborted'"
      );
    }
  } else {
    throw new Error("id cannot be empty");
  }
});

router.get("/jobs/before/:date", async (req, res) => {
  const date = req.params.date;
  const jobs = await getJobsCreatedBeforeDate(date);
  res.send(jobs);
});

router.get("/jobs/after/:date", async (req, res) => {
  const date = req.params.date;
  const jobs = await getJobsCreatedAfterDate(date);
  res.send(jobs);
});

module.exports = router;
