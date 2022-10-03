const router = require("express").Router();
const mongoose = require("mongoose");
const Project = require("../models/Project.model");
const User = require("../models/User.model");
const Session = require("../models/Session.model");
const Sprint = require("../models/Sprint.model");

//MIDDLEWARE
const isLoggedIn = require("../middleware/isLoggedIn");
const Tasks = require("../models/Tasks.model");

//CREATE SPRINT
router.post("/", isLoggedIn, (req, res) => {
  req.body.user = req.user._id;
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
  console.log(req.query)
  Sprint.find({ project: req.query.projectId })
  .populate('tasks')
    .then((sprints) => {
      // console.log('SPRINTS',sprints)
      res.json({sprints : sprints});
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

//ADD TASKS FROM BACKLOG TO SPRINT
router.put("/:id/tasks", (req, res) => {
  Tasks.findById(req.body.taskId)
  .then((task)=>{
  Sprint.findByIdAndUpdate(req.params.id, { $push: { tasks: task } })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((error) => {
      return res.status(500).json({ errorMessage: error.message });
    });
  })
});

module.exports = router;
