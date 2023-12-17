const express = require("express");
const {
  getGoals,
  postGoals,
  updateGoals,
  deleteGoals,
} = require("../controller/goalController");

const router = express.Router();

router.get("/", getGoals);

router.post("/", postGoals);

router.put("/:id", updateGoals);

router.delete("/:id", deleteGoals);

module.exports = router;
