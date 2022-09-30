const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PipelineCardSchema = new Schema ({
    title: String,
    tasks:[{
        type: Schema.Type.ObjectId,
        ref: 'Tasks'
    }]
})

const PipelineCard = mongoose.model('PipelineCard', PipelineCardSchema)
module.exports = PipelineCard