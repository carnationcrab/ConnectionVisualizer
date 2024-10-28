import express from 'express'
import fs from 'fs'
import path from 'path'
import Node from '../models/Node.js'
import Edge from '../models/Edge.js'
import Repo from '../models/Repo.js'
import { findFiles, findDependencies } from '../utils/dependencyUtils.js'

const router = express.Router()

const updateRepoStatus = async (repo, status, message = '') => {
    if (repo) {
        Object.assign(repo, { status, message })
        await repo.save()
    }
}

const getNodeType = (filePath) => {
    const extension = path.extname(filePath)?.toLowerCase()
    return ['.cpp', '.c'].includes(extension) ? 'source' :
        ['.h', '.hpp'].includes(extension) ? 'header' : 'file'
}

const createEdges = async (nodeId, dependencies) => {
    await Promise.all(
        dependencies.map(async (dep) => {
            let targetNode = await Node.findOne({ name: dep })
            if (!targetNode) {
                targetNode = await Node.create({ name: dep, type: 'file' })
            }
            await Edge.create({ source: nodeId, target: targetNode._id, dependencyType: 'import' })
        })
    )
}

router.post('/traverseRepo', async (req, res) => {
    const { folderPath: filePath } = req.body
    let repo

    try {
        if (!fs.existsSync(filePath)) {
            return res.status(400).json({ error: 'File path does not exist' })
        }

        // CREATE NEW REPO
        repo = await Repo.create({ folderPath: filePath, status: 'in progress' })

        // PROCESS FILES AND DEPENDENCIES
        const files = findFiles(filePath)
        for (const filePath of files) {
            let fileContent

            // READ FILE
            try {
                fileContent = fs.readFileSync(filePath, 'utf-8')
            } catch (readError) {
                console.warn(`Could not read file ${filePath}:`, readError.message)
                continue
            }

            const dependencies = findDependencies(filePath, fileContent)

            let node = await Node.findOne({ name: filePath })
            if (!node) {
                const nodeType = getNodeType(filePath)
                node = await Node.create({ name: filePath, type: nodeType })
            }

            await createEdges(node._id, dependencies)
        }

        // UPDATE REPO STATUS
        await updateRepoStatus(repo, 'completed', 'Folder processed successfully')

        // GET NODES AND EDGES
        const nodes = await Node.find()
        const edges = await Edge.find().populate('source target')

        // SEND NODES AND EDGES
        res.status(200).json({ message: 'Folder processed successfully', nodes, edges })
    } catch (error) {
        await updateRepoStatus(repo, 'failed', error.message)
        res.status(500).json({ error: error.message || 'Error processing folder' })
    }
})

export default router
