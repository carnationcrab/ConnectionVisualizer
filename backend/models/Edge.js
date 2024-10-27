const mongoose = require('mongoose')
const Schema = mongoose.Schema

const edgeSchema = new mongoose.Schema({
    source: {
        type: Schema.Types.ObjectId,
        ref: 'Node',
        required: true
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: 'Node',
        required: true
    },
    dependencyType: {
        type: String,
        enum: ['includes', 'calls', 'inherits', 'references'],
        required: true
    },
})

module.exports = mongoose.model('Edge', edgeSchema)
