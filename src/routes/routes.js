import express from "express";

const router = express.Router();
router.use(express.json());

router.get("/layers/updated-last-week");
