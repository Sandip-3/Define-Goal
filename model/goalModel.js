const { timeStamp } = require("console");
const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user : {
      type : mongoose.Schema.Types.ObjectId,
      required : true,
      ref : 'User'
    },
    text: {
      type: String,
      required: [true, "Please Add a Title to Goal"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
