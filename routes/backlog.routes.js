const router = require("express").Router();
const mongoose = require("mongoose");
const Backlog = require("../models/Backlog.model");
const Backlog = require("../models/Backlog.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const Tasks = require("../models/Tasks.model");


//CREATE A TASK
router.post("/backlog/:id/task", isLoggedIn, (req, res) => {
    Tasks.create(req.body)
      .then((task) => {
        Backlog.findByIsAndUpdate(
          { _id: req.params._id },
          { $push: { tasks: task } }
        )
          .then((result) => {
            
            res.json(task);
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
