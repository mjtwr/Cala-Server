const router = require("express").Router();
const mongoose = require("mongoose");
const Project = require("../models/Project.model");
const User = require("../models/User.model");
const Session = require("../models/Session.model");
const Sprint = require("../models/Sprint.model");

//MIDDLEWARE
const isLoggedIn = require("../middleware/isLoggedIn");
const Tasks = require("../models/Tasks.model");
const Backlog = require("../models/Backlog.model");

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
  console.log(req.query);
  Sprint.find({ project: req.query.projectId })
    .populate("tasks")
    .then((sprints) => {
      // console.log('SPRINTS',sprints)
      res.json({ sprints: sprints });
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
//:id = sprint
//check postman                                 query backlogId=
// ex. {{URL}}/sprints/633a6da8bb1e30a8befbae3b/tasks?backlogId=633a5db299f8acab76adb832
router.put("/:id/tasks/", (req, res) => {
  Tasks.findById(req.body.taskId).then((task) => {
    console.log(task);
    Sprint.findByIdAndUpdate(req.params.id, { $push: { tasks: task } })
      .then((result) => {
        console.log(result);
        // sessionModel.updateOne( { _id: YOUR_SESSION_ID }, { $pull: { session_users: { user_id: YOUR_USER_ID } } } )
        Backlog.updateOne(
          { _id: req.query.backlogId },
          { $pullAll: { tasks: [{ _id: req.body.taskId }] } }
        )
          .then((result) => {
            res.json(result);
          })
          .catch((error) => {
            return res.status(500).json({ errorMessage: error.message });
          });
      })
      .catch((error) => {
        return res.status(500).json({ errorMessage: error.message });
      });
  });
});

//MOVE TASK FROM SPRINT TO BACKLOG
//check postman                                                         query backlogId=
//ex. {{URL}}/sprints/633a6da8bb1e30a8befbae3b/tasks/633a6f3eed08f977eb4568cb?backlogId=633a5db299f8acab76adb832
router.delete("/:sprintId/tasks/:taskId", (req, res) => {
  Tasks.findById(req.params.taskId).then((task) => {
    Sprint.updateOne(
      { _id: req.params.sprintId },
      { $pullAll: { tasks: [{ _id: req.params.taskId }] } }
    )
      .then((result) => {
        //desde front tengo que mandar el id del backlog para mandarle la task
        Backlog.findByIdAndUpdate(req.query.backlogId, {
          $push: { tasks: task },
        })
          .then((result) => {
            res.json(result);
          })
          .catch((error) => {
            return res.status(500).json({ errorMessage: error.message });
          });
      })
      .catch((error) => {
        return res.status(500).json({ errorMessage: error.message });
      });
  });
});
//READ LIST OF TASKS IN A SPRINT
router.get("/:sprintId/tasks", isLoggedIn, (req, res) => {
  Sprint.findById(req.params.sprintId)
    .populate("tasks")
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => {
      return res.status(500).json({ errorMessage: error.message });
    });
});

//UPDATE TASK'S STATUS DRAGNDROP
router.put("/:sprintId/tasks/:taskId", isLoggedIn, (req, res) => {
  const { status } = req.body;
  Tasks.findByIdAndUpdate(req.params.taskId, { status: status })
    .then((task) => {
      if (task === null) {
        return res.status(404).json({ errorMessage: "Not Found" });
      }
      res.json(task);
    })
    .catch((error) => {
      return res.status(500).json({ errorMessage: error.message });
    });
});

module.exports = router;
