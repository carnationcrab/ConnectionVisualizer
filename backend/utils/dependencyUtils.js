import fs from 'fs'
import path from 'path'

const ALLOWED_EXTENSIONS = ['.cpp', '.c', '.h', '.hpp']
const EXCLUDED_DIRECTORIES = ['.git', 'build', 'out', 'node_modules', 'private', 'docs', 'vendor']

export const findFiles = (dir) => {
    let results = []
    const list = fs.readdirSync(dir)

    list.forEach((file) => {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)

        // SKIP EXCLUDED DIRECTORIES
        if (stat.isDirectory() && EXCLUDED_DIRECTORIES.includes(file)) {
            return
        }

        // PROCESS SUBDIRECTORIES RECURSIVELY
        if (stat.isDirectory()) {
            results = results.concat(findFiles(filePath))
        } else {
            if (ALLOWED_EXTENSIONS.includes(path.extname(file))) {
                results.push(filePath)
            }
        }
    })

    return results
}

// PARSE FILE DEPENDENCIES
export const findDependencies = (filePath, fileContent) => {
    const dependencies = []
    const importPattern = /import\s.*\sfrom\s+['"](.*)['"]/g
    const requirePattern = /require\(['"](.*)['"]\)/g
    const includePattern = /#include\s+["<](.*)[">]/g

    let match
    while ((match = importPattern.exec(fileContent)) !== null) {
        dependencies.push(path.join(path.dirname(filePath), match[1]))
    }
    while ((match = requirePattern.exec(fileContent)) !== null) {
        dependencies.push(path.join(path.dirname(filePath), match[1]))
    }
    while ((match = includePattern.exec(fileContent)) !== null) {
        dependencies.push(path.join(path.dirname(filePath), match[1]))
    }
    return dependencies
}
