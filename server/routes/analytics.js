const express = require('express')
const router  = express.Router()

const pageViews = {}
const sessions  = new Set()

router.post('/track', (req, res) => {
  const { page = '/' } = req.body
  pageViews[page] = (pageViews[page] || 0) + 1
  sessions.add(req.ip || 'unknown')
  res.json({ success:true })
})

router.get('/stats', (req, res) => {
  const total = Object.values(pageViews).reduce((a, b) => a + b, 0)
  res.json({
    pageViews,
    totalViews: total,
    uniqueSessions: sessions.size,
    topPages: Object.entries(pageViews).sort(([,a],[,b]) => b-a).slice(0,10).map(([page,views]) => ({ page, views })),
  })
})

module.exports = router
