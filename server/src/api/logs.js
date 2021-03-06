/* eslint-disable no-console */
/* eslint-disable quotes */
const { Router } = require("express");
const LogEntry = require("../models/LogEntry");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (err) {
    if (err.name === "ValidationError") res.status(422);
    next(err);
  }
  console.log(req.body);
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await LogEntry.findByIdAndRemove(id, () => {
      res.send({ removedId: id });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
