const router = require("express").Router();
const mongoose = require("mongoose");
const Tasks = require("../models/Tasks.model");
const User = require("../models/User.model");
const Session = require("../models/Session.model");

//MIDDLEWARE
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const { route } = require("./projects.routes");

//TODO: , userid by params, errors

//CREATE A TASK
router.post("/", isLoggedIn, (req, res) => {
  Tasks.create(req.body)
    .then((task) => {
      res.json(task);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errorMessage: error });
      }
      return res.status(500).json({ errorMessage: error.message });
    });
});

//READ LIST OF TASKS
router.get("/", isLoggedIn, (req, res) => {
  let id = "633766058adf8bd67f0538be";
  Tasks.find({ user: id })
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => {
      return res.status(500).json({ errorMessage: error.message });
    });
});

//UPDATE TASK
router.put("/:id", isLoggedIn, (req, res) => {
  Tasks.findByIdAndUpdate(req.params.id, req.body)
    .then((task) => {
      if (task === null) {
        return res.status(404).json({ errorMessage: "Not Found" });
      }
      res.json(task);
    })
    .catch((err) => {
      return res.status(500).json({ errorMessage: error.message });
    });
});

//DELETE TASK
router.delete("/:id", isLoggedIn, (req, res) => {
  Tasks.findByIdAndDelete(req.params.id)
    .then((task) => {
      if (task === null) {
        return res.status(404).json({ errorMessage: "Not Found" });
      }
      res.json(task);
    })
    .catch((err) => {
      return res.status(500).json({ errorMessage: error.Message });
    });
});

module.exports = router;
