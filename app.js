// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

//ROUTES
const projects = require("./routes/projects.routes");
app.use("/projects", projects);

const tasks = require("./routes/tasks.routes");
app.use("/tasks", tasks);

const sprints = require("./routes/sprint.routes");
app.use("/sprints", sprints);


const backlogs = require("./routes/backlog.routes");
app.use("/backlogs", backlogs);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
