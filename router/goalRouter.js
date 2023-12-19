const express = require("express");
const {
  getGoals,
  postGoals,
  updateGoals,
  deleteGoals,
} = require("../controller/goalController");
const {protect} = require('../middleware/authMiddleware')

const router = express.Router();

router.get("/", protect ,getGoals);

router.post("/", protect, postGoals);

router.put("/:id", protect, updateGoals);

router.delete("/:id", protect ,deleteGoals);

module.exports = router;


