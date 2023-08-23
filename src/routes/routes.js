const express = require("express");
const { getJobsUpdatedLastWeek } = require("../services/dbServices");

const router = express.Router();
router.use(express.json());

router.get("/jobs/updated-last-week", async (req, res) => {
  const updatedLastWeek = await getJobsUpdatedLastWeek();
  res.send(updatedLastWeek);
});

module.exports = router;
