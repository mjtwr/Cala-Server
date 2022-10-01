const router = require("express").Router();
const mongoose = require("mongoose");
const Project = require("../models/Project.model");
const User = require("../models/User.model");
const Session = require("../models/Session.model");
const Backlog = require("../models/Backlog.model");

//MIDDLEWARE
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Tasks = require("../models/Tasks.model");
const { populate } = require("../models/Project.model");

//TODO: middleware, userid by params, errors

//CREATE A PROJECT
router.post("/", isLoggedIn, (req, res) => {
  Project.create(req.body)
    .then((project) => {
      Backlog.create({ project: project._id })
        .then((backlog) => {
          console.log(backlog);
          res.json(project);
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

//READ LIST OF PROJECTS
router.get("/", isLoggedIn, (req, res) => {
  let id = "633766058adf8bd67f0538be";
  Project.find({ user: id })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      return res.status(500).json({ errorMessage: error.message });
    });
});

// UPDATE PROJECT
//Doesnt send err when mas length of title & description is overrided
router.put("/:id",  isLoggedIn,(req, res) => {
  Project.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      if (result == null) {
        return res.status(404).json({ errorMessage: "Project Not Found" });
      }
      res.json(result);
    })
    .catch((error) => {
      return res.status(500).json({ errorMessage: error.message });
    });
});

//DELETE PROJECT
router.delete("/:id", isLoggedIn, (req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result === null) {
        return res.status(404).json({ errorMessage: "Not Found" });
      }
      res.json(result);
    })
    .catch((error) => {
      return res.status(500).json({ errorMessage: error.message });
    });
});

//BACKLOG
//GET LIST OF TASKS
router.get("/:id/backlogs",  isLoggedIn,(req, res) => {
  let id = req.params.id;
  console.log("IDDD", id);
  Backlog.find({ project: id })
    // .populate("tasks")
    .then((backlog) => {
      console.log("BACKLOG", backlog);
      res.json(backlog.tasks);
    })
    .catch((error) => {
      return res.status(500).json({ errorMessage: error.message });
    });
});

module.exports = router;
