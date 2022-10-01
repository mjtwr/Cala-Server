const router = require("express").Router();
const mongoose = require("mongoose");
const Project = require("../models/Project.model");
const User = require("../models/User.model");
const Session = require("../models/Session.model");
const Sprint = require("../models/Sprint.model");

//MIDDLEWARE
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Tasks = require("../models/Tasks.model");

//CREATE SPRINT
router.post("/", isLoggedIn, (req, res) => {
  Sprint.create(req.body)
    .then((sprint) => {
      res.json(sprint);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errorMessage: error });
      }
      return res.status(500).json({ errorMessage: error.message });
    });
});

//READ LIST OF SPRINTS
router.get("/", isLoggedIn, (req, res) => {
  let id = "633765168bb3db7d110b585d";
  Sprint.find({ user: id })
    .then((sprint) => {
      res.json(sprint);
    })
    .catch((error) => {
      return res.status(500).json({ errorMessage: error.message });
    });
});

//UPDATE SPRINT
router.put("/:id", isLoggedIn, (req, res) => {
  Sprint.findByIdAndUpdate(req.params.id, req.body)
    .then((sprint) => {
      if (sprint == null) {
        return res.status(404).json({ errorMessage: "Project Not Found" });
      }
      res.json(sprint);
    })
    .catch((error) => {
      return res.status(500).json({ errorMessage: error.message });
    });
});

//DELETE SPRINT
router.delete("/:id", isLoggedIn, (req, res) => {
  Sprint.findByIdAndDelete(req.params.id)
    .then((sprint) => {
      if (sprint === null) {
        return res.status(404).json({ errorMessage: "Project Not Found" });
      }
      res.json(sprint);
    })
    .catch((error) => {
      return res.status(500).json({ errorMessage: error.message });
    });
});

module.exports = router;
