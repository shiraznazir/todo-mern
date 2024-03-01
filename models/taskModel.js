const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task_name: {
    type: String,
    required: true,
  },
  task_description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
