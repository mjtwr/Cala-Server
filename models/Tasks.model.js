const mongoose = require("mongoose");
const Schema = mongoose.Schema

const TasksSchema = new Schema ({
    title: String,
    description: String,
    startDate: Date,
    finishDate:Date,
    status:{
        type: String,
        enum: ['to-do', 'in progress', 'testing', 'done'],
        default: 'to-do'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image: String,
    file: String,
    type:{
        type: String,
        enum: ['task', 'user story', 'bug'],
        default: 'task'
    },
    priority:{
        type: String,
        enum: ['high', 'medium', 'low']
    }
})
const Tasks = mongoose.model('Tasks', TasksSchema)
module.exports = Tasks