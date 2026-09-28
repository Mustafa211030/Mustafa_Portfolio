const express = require('express')
const jwt     = require('jsonwebtoken')
const bcrypt  = require('bcryptjs')
const logger  = require('../utils/logger')
const router  = express.Router()

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error:'Email and password required' })
    if (email !== process.env.ADMIN_EMAIL) return res.status(401).json({ error:'Invalid credentials' })
    const valid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)
    if (!valid) { logger.warn(`Failed login: ${email}`); return res.status(401).json({ error:'Invalid credentials' }) }
    const token = jwt.sign({ role:'admin', email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })
    logger.info(`Admin login: ${email}`)
    res.json({ token, expiresIn: process.env.JWT_EXPIRES_IN || '7d' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.post('/verify', (req, res) => {
  const { token } = req.body
  if (!token) return res.json({ valid:false })
  try { res.json({ valid:true, decoded: jwt.verify(token, process.env.JWT_SECRET) }) }
  catch { res.json({ valid:false }) }
})

module.exports = router
