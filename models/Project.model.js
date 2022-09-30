const mongoose = require('mongoose')
const {Schema, model} = mongoose

const ProjectSchema = new Schema({
    title: String,
    description: String,
    user:[{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }]
},{
    timestamps: true
})
const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project