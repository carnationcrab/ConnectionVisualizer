import mongoose from 'mongoose'

const repoSchema = new mongoose.Schema({
    folderPath: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'in progress', 'completed', 'failed'], default: 'pending' },
    message: { type: String }
})

export default mongoose.model('Repo', repoSchema)
