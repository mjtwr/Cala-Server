const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BacklogSchema = new Schema({
    project:{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    tasks:[{
        type: Schema.Types.ObjectId,
        ref: 'Tasks'
    }]
},{
    timestamps:true
})

const Backlog = mongoose.model('Backlog', BacklogSchema)

module.exports = Backlog