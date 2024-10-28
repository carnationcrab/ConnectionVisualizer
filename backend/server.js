import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import nodeRoutes from './routes/nodes.js'
import edgeRoutes from './routes/edges.js'
import traverseRepoRoute from './routes/traverseRepo.js'


const app = express()
const PORT = process.env.PORT || 5000
const dbUri = 'mongodb://localhost:27017/connectionsDB'

// MIDDLEWARE
app.use(cors())
app.use(express.json())

// ROUTES
app.use('/api/nodes', nodeRoutes)
app.use('/api/edges', edgeRoutes)
app.use('/api', traverseRepoRoute)

    // DB CONNECT (async/await)
    // Immediately Invoked Function Expression (IIFE)
    ; (async () => {
        try {
            await mongoose.connect(dbUri, {
                // useNewUrlParser: true,      // deprecated? not needed?
                // useUnifiedTopology: true,
            })
            console.log('MongoDB Connected')
        } catch (error) {
            console.error('ERROR: Cannot connect to MongoDB', error?.message || error)
            process.exit(1)
        }
    })()

// SERVER START
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
