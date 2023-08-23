const express = require("express");
const {
  getJobsUpdatedLastWeek,
  getAllUncompleted,
  getJobByJobId,
  getJobsAroundDate,
} = require("../services/dbServices");

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
  if (!date) {
    throw new Error("Date cannot be empty");
  }
  const jobs = await getJobsAroundDate(date);
  res.send(jobs);
});

module.exports = router;
