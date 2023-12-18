const asyncHanlder = require("express-async-handler");
const Goal = require("../model/goalModel");

const getGoals = asyncHanlder(async (req, res) => {
  const goal = await Goal.find();
  res.status(200).json({ goal });
});

const postGoals = asyncHanlder(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please Add Text");
  }
  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(200).json(goal);
});

const updateGoals = asyncHanlder(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedGoals = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoals);
});

const deleteGoals = asyncHanlder(async (req, res) => {
  const goal = await Goal.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Deleted ID ${req.params.id}` });
});

module.exports = {
  getGoals,
  postGoals,
  updateGoals,
  deleteGoals,
};
