const router = require("express").Router();
const mongoose = require("mongoose");
const Tasks = require("../models/Tasks.model");
const User = require("../models/User.model");
const Session = require("../models/Session.model");

//MIDDLEWARE
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const { route } = require("./projects.routes");
const Backlog = require("../models/Backlog.model");
const Project = require("../models/Project.model");
const Sprint = require("../models/Sprint.model");

//READ LIST OF TASKS
router.get("/", isLoggedIn, (req, res) => {
  Tasks.find(req.user._id)
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
      res.json({"status": "ok"})
    })
    .catch((err) => {
      return res.status(500).json({ errorMessage: error.message });
    })
})

module.exports = router;
