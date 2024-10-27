const mongoose = require('mongoose')

const nodeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['file', 'module', 'class', 'function'],
        required: true
    },
    description: {
        type: String
    },
})

module.exports = mongoose.model('Node', nodeSchema)
