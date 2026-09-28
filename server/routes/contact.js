const express  = require('express')
const { body, validationResult } = require('express-validator')
const Contact  = require('../models/Contact')
const { sendContactNotification, sendContactAutoReply } = require('../utils/email')
const logger   = require('../utils/logger')
const router   = express.Router()

const validate = [
  body('name').trim().notEmpty().withMessage('Name required').isLength({ max:100 }),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('message').trim().notEmpty().withMessage('Message required').isLength({ max:2000 }),
  body('company').optional().trim().isLength({ max:100 }),
]

router.post('/', validate, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
  try {
    const { name, email, company, budget, message } = req.body
    const contact = await Contact.create({ name, email, company, budget, message, ip:req.ip, userAgent:req.headers['user-agent'] })
    Promise.all([
      sendContactNotification({ name, email, company, budget, message }),
      sendContactAutoReply({ name, email }),
    ]).catch(err => logger.error('Email error:', err))
    logger.info(`Contact from ${email}`)
    res.status(201).json({ success:true, id:contact._id })
  } catch (err) {
    logger.error('Contact route error:', err)
    res.status(500).json({ error: 'Failed to submit. Please try again.' })
  }
})

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt:-1 }).limit(100)
    res.json(contacts)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.patch('/:id/status', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status:req.body.status }, { new:true })
    if (!contact) return res.status(404).json({ error:'Not found' })
    res.json(contact)
  } catch (err) { res.status(400).json({ error: err.message }) }
})

module.exports = router
