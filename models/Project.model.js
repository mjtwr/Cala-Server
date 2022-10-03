const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 25,
    },
    description: {
      type: String,
      required: true,
      maxLength: 50,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
