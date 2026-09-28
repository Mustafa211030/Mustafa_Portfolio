function sanitize(req, res, next) {
  if (req.body && typeof req.body === 'object') {
    for (const key of Object.keys(req.body)) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].replace(/</g,'&lt;').replace(/>/g,'&gt;')
      }
    }
  }
  next()
}
module.exports = { sanitize }
