const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = 9000;
const url3 = "mongodb://localhost:27017/todo-app";

mongoose.connect(url3);

const connection = mongoose.connection;

connection.on("open", () => {
  console.log("Connected.....");
});

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  return res.send("Hello World");
});

const tasksRouter = require("./routes/task");
app.use("/tasks", tasksRouter);

app.listen(port, () => {
  console.log("Server is up at", port);
});
