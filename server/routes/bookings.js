const express  = require('express')
const { body, validationResult } = require('express-validator')
const Booking  = require('../models/Booking')
const { sendBookingConfirmation, sendBookingNotification } = require('../utils/email')
const logger   = require('../utils/logger')
const router   = express.Router()

const validate = [
  body('name').trim().notEmpty().withMessage('Name required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('date').trim().notEmpty().withMessage('Date required'),
  body('time').trim().notEmpty().withMessage('Time required'),
  body('topic').trim().notEmpty().withMessage('Topic required'),
  body('notes').optional().trim().isLength({ max:1000 }),
]

router.post('/', validate, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
  try {
    const { name, email, date, time, topic, notes } = req.body
    const existing = await Booking.findOne({ date, time, status:{ $in:['pending','confirmed'] } })
    if (existing) return res.status(409).json({ error:'This time slot was just booked. Please choose another.' })
    const booking = await Booking.create({ name, email, date, time, topic, notes, ip:req.ip })
    Promise.all([
      sendBookingConfirmation({ name, email, date, time, topic }),
      sendBookingNotification({ name, email, date, time, topic, notes }),
    ]).catch(err => logger.error('Booking email error:', err))
    logger.info(`Booking: ${date} ${time} — ${name}`)
    res.status(201).json({ success:true, id:booking._id })
  } catch (err) {
    logger.error('Booking error:', err)
    res.status(500).json({ error: 'Booking failed. Please try again.' })
  }
})

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt:-1 }).limit(100)
    res.json(bookings)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.get('/slots', async (req, res) => {
  const { date } = req.query
  if (!date) return res.status(400).json({ error: 'date param required' })
  try {
    const bookings = await Booking.find({ date, status:{ $in:['pending','confirmed'] } }).select('time -_id')
    res.json({ bookedSlots: bookings.map(b => b.time) })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.patch('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new:true })
    if (!booking) return res.status(404).json({ error:'Not found' })
    res.json(booking)
  } catch (err) { res.status(400).json({ error: err.message }) }
})

router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id)
    res.json({ success:true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

module.exports = router
