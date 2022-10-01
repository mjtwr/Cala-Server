const router = require("express").Router();
const mongoose = require("mongoose");
const Project = require("../models/Project.model");
const User = require("../models/User.model");
const Session = require("../models/Session.model");

//MIDDLEWARE
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const { populate } = require("../models/Project.model");

//TODO: middleware, userid by params, errors

router.post("/", (req, res) => {
  Project.create(req.body)
    .then((project) => {
      res.json(project);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errorMessage: error });
      }
      return res.status(500).json({ errorMessage: error.message });
    });
});

router.get("/", (req, res) => {
  let id = "633766058adf8bd67f0538be";
  Project.find({ user: id })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      return res.status(500).json({ errorMessage: error.message });
    });
});

//Doesnt send err when mas length of title & description is overrided
router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
    Project.findByIdAndDelete(req.params.id)
    .then((result)=>{
        if (result ===null){
            return res.status(404).json({ errorMessage: 'Not Found'})
        }
        console.log(result)
        res.json(result);
    }).catch((error) => {
        return res.status(500).json({ errorMessage: error.message });
      });
  
});

module.exports = router;
