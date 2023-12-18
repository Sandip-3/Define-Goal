const { timeStamp } = require("console");
const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      require: [true, "Please Add a Title to Goal"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
