const jwt    = require('jsonwebtoken')
const logger = require('../utils/logger')

function protect(req, res, next) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer '))
    return res.status(401).json({ error: 'Not authorised — no token' })

  try {
    req.admin = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET)
    next()
  } catch (err) {
    logger.warn(`Invalid token: ${err.message}`)
    return res.status(401).json({ error: 'Not authorised — invalid token' })
  }
}

module.exports = { protect }
