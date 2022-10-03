const router = require("express").Router();
const mongoose = require("mongoose");
const Backlog = require("../models/Backlog.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const Tasks = require("../models/Tasks.model");
const Sprint = require("../models/Sprint.model");

//CREATE A TASK
router.post("/:id/tasks", isLoggedIn, (req, res) => {
  let task = req.body;
  Tasks.create(task)
    .then((task) => {
      Backlog.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { tasks: task } },
        { new: true }
      )
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          return res.status(500).json({ errorMessage: error.message });
        });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errorMessage: error });
      }
      return res.status(500).json({ errorMessage: error.message });
    });
});

module.exports = router;
