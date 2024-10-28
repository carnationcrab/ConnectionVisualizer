import express from 'express'
import Edge from '../models/Edge.js'

const router = express.Router()

// CREATE
router.post('/', async (req, res) => {
    try {
        const edge = await Edge.create(req.body)
        res.status(201).json(edge)
    } catch (error) {
        res.status(400).json({ error: error?.message || 'Error creating edge' })
    }
})

// READ ALL
router.get('/', async (req, res) => {
    try {
        const edges = await Edge.find().populate('source target')
        res.status(200).json(edges)
    } catch (error) {
        res.status(500).json({ error: error?.message || 'Error fetching edges' })
    }
})

// UPDATE BY ID
router.put('/:id', async (req, res) => {
    try {
        const edge = await Edge.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(edge)
    } catch (error) {
        res.status(400).json({ error: error?.message || 'Error updating edge' })
    }
})

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        await Edge.findByIdAndDelete(req.params.id)
        res.status(204).end()
    } catch (error) {
        res.status(500).json({ error: error?.message || 'Error deleting edge' })
    }
})

export default router
