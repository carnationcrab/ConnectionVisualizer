const express = require('express')
const router = express.Router()
const Edge = require('../models/Edge')

// CREATE
router.post('/', async (req, res) => {
    try {
        const edge = new Edge(req.body)
        await edge.save()
        res.status(201).json(edge)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// READ ALL
router.get('/', async (req, res) => {
    try {
        const edges = await Edge.find().populate('source target') // adds more details with populate
        res.status(200).json(edges)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// UPDATE BY ID
router.put('/:id', async (req, res) => {
    try {
        const edge = await Edge.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(edge)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        await Edge.findByIdAndDelete(req.params.id)
        res.status(204).end()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router
