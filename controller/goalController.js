const asyncHanlder = require("express-async-handler");
const Goal = require("../model/goalModel");
const User = require("../model/userModel");

const getGoals = asyncHanlder(async (req, res) => {
  const goal = await Goal.find({ user: req.user.id });
  res.status(200).json(goal);
});

const postGoals = asyncHanlder(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please Add Text");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

const updateGoals = asyncHanlder(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not Found");
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("Not Authorized User");
  }

  const updatedGoals = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoals);
});

const deleteGoals = asyncHanlder(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not Found");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not Found");
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("Not Authorized User");
  }

  goal = await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  postGoals,
  updateGoals,
  deleteGoals,
};
