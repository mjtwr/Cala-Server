const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TasksSchema = new Schema(
  {
    title: String,
    description: String,
    startDate: Date,
    finishDate: Date,
    status: {
      type: String,
      enum: ["todo", "inprogress", "testing", "done"],
      default: "todo",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    image: String,
    file: String,
    type: {
      type: String,
      enum: ["task", "user story", "bug"],
      default: "task",
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
    },
  },
  { timestamps: true }
);
const Tasks = mongoose.model("Tasks", TasksSchema);
module.exports = Tasks;
