const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const nodeRoutes = require('./routes/nodes')
const edgeRoutes = require('./routes/edges')

const app = express()
const PORT = 5000

const protocol = 'mongodb://'
const localIP = 'localhost'   // points to the local machine, tells mongo db local server
const mongoPort = '27017'     // default port for mongodb
const dbName = 'connectionsDB'

// MIDDLEWARE
app.use(cors())
app.use(express.json())

app.use('/api/nodes', nodeRoutes);
app.use('/api/edges', edgeRoutes);

// DB CONNECT
mongoose.connect(`${protocol}${localIP}:${mongoPort}/${dbName}`, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected')
}).catch((error) => {
    console.error('ERROR: Cannot connect to MongoDB')
})

// SERVE
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})