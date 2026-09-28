const express = require('express')
const Project = require('../models/Project')
const logger  = require('../utils/logger')
const router  = express.Router()

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ status:'published' }).sort({ order:1, createdAt:-1 })
    res.json(projects)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ error:'Not found' })
    res.json(project)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.post('/', async (req, res) => {
  try {
    const project = await Project.create(req.body)
    logger.info(`Project created: ${project.title}`)
    res.status(201).json(project)
  } catch (err) { res.status(400).json({ error: err.message }) }
})

router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true })
    if (!project) return res.status(404).json({ error:'Not found' })
    res.json(project)
  } catch (err) { res.status(400).json({ error: err.message }) }
})

router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ success:true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

module.exports = router
