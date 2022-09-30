const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PipelineSchema = new Schema({
    sprint: {
        type: Schema.Type.ObjectId,
        ref: 'Sprint'
    },
    cards: [{
        type: Schema.Type.ObjectId,
        ref: 'PipelineCard'
    }]
}, {
    timestamps: true
})

const Pipeline = mongoose.model('Pipeline', PipelineSchema)

module.exports= Pipeline