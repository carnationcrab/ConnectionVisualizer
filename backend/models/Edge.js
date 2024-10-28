import mongoose from 'mongoose'

const edgeSchema = new mongoose.Schema({
    source: { type: mongoose.Schema.Types.ObjectId, ref: 'Node', required: true },
    target: { type: mongoose.Schema.Types.ObjectId, ref: 'Node', required: true },
    dependencyType: {
        type: String,
        enum: ['includes', 'calls', 'inherits', 'references', 'import'],
        required: true,
    },
})

export default mongoose.model('Edge', edgeSchema)
