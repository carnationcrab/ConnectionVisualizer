import express from 'express'
import Node from '../models/Node.js'

const router = express.Router()

// CREATE
router.post('/', async (req, res) => {
    try {
        const node = await Node.create(req.body)
        res.status(201).json(node)
    } catch (error) {
        res.status(400).json({ error: error?.message || 'Error creating node' })
    }
})

// READ ALL
router.get('/', async (req, res) => {
    try {
        const nodes = await Node.find()
        res.status(200).json(nodes)
    } catch (error) {
        res.status(500).json({ error: error?.message || 'Error fetching nodes' })
    }
})

// READ BY ID
router.get('/:id', async (req, res) => {
    try {
        const node = await Node.findById(req.params.id)
        if (!node) return res.status(404).json({ message: 'Node not found' })
        res.status(200).json(node)
    } catch (error) {
        res.status(500).json({ error: error?.message || 'Error fetching node' })
    }
})

// UPDATE BY ID
router.put('/:id', async (req, res) => {
    try {
        const node = await Node.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(node)
    } catch (error) {
        res.status(400).json({ error: error?.message || 'Error updating node' })
    }
})

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        await Node.findByIdAndDelete(req.params.id)
        res.status(204).end()
    } catch (error) {
        res.status(500).json({ error: error?.message || 'Error deleting node' })
    }
})

export default router
