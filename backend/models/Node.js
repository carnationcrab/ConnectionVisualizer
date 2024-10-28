import mongoose from 'mongoose'

const nodeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    type: {
        type: String,
        enum: ['file', 'module', 'class', 'function', 'source', 'header'],
        required: false
    },
    description: String,
})

export default mongoose.model('Node', nodeSchema)
