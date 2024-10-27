const express = require('express')
const router = express.Router()
const Node = require('../models/Node')

// CREATE
router.post('/', async (req, res) => {
    try {
        const node = new Node(req.body)
        await node.save()
        res.status(201).json(node)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// READ ALL
router.get('/', async (req, res) => {
    try {
        const nodes = await Node.find()
        res.status(200).json(nodes)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// READ BY ID
router.get('/:id', async (req, res) => {
    try {
        const node = await Node.findById(req.params.id)
        if (node) res.status(200).json(node)
        else res.status(404).json({ message: 'Node not found' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// UPDATE BY ID
router.put('/:id', async (req, res) => {
    try {
        const node = await Node.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(node)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        await Node.findByIdAndDelete(req.params.id)
        res.status(204).end()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router
