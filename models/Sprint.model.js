const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SprintSchema = new Schema ({
    title: String,
    startDate: Date,
    finishDate: Date,
    description: String,
    status:{
        type: String,
        enum: ['start', 'in progress', 'finished']
    },
    tasks:[{
        type: Schema.Type.ObjectId,
        ref: 'Tasks'
    }]
},{
    timestamps:true
})

const Sprint = mongoose.model('Sprint', SprintSchema)
module.exports = Sprint