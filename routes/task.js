const express = require("express");
const router = express.Router();
const Task = require("../models/taskModel");

router.get("/", async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

router.post("/new", async (req, res) => {
  try {
    console.log("Req ", req.body);
    const newTask = new Task(req.body);
    const task = await newTask.save();
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body);
    res.status(200).json({
      success: true,
      message: "Updated Succesfullly",
      data: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    const removedTask = await Task.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: removedTask,
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
