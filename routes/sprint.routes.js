const router = require("express").Router();
const mongoose = require("mongoose");
const Project = require("../models/Project.model");
const User = require("../models/User.model");
const Session = require("../models/Session.model");
const Sprint = require('../models/Sprint.model')

//MIDDLEWARE
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Tasks = require("../models/Tasks.model");

//CREATE SPRINT
router.post('/', (req,res)=>{
    Sprint.create(req.body)
    .then((sprint)=>{
        res.json(sprint)
    }).catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
})

//READ LIST OF SPRINTS


//UPDATE SPRINT


//DELETE SPRINT


module.exports = router;
