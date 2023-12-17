const asyncHanlder = require('express-async-handler')

const getGoals = asyncHanlder(async(req, res) => {
  res.status(200).json({ message: "Hello From Get Controller" });
});

const postGoals = asyncHanlder(async(req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please Add Text");
  }
  res.status(200).json({ message: "Post request from Controller" });
});

const updateGoals = asyncHanlder(async(req, res) => {
  res
    .status(200)
    .json({ message: `Update Controller with ID ${req.params.id}` });
});

const deleteGoals = asyncHanlder(async(req, res) => {
  res
    .status(200)
    .json({ message: `Delete Controller with ID ${req.params.id}` });
});

module.exports = {
  getGoals,
  postGoals,
  updateGoals,
  deleteGoals,
};
