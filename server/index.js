require('dotenv').config()
const express    = require('express')
const cors       = require('cors')
const helmet     = require('helmet')
const morgan     = require('morgan')
const rateLimit  = require('express-rate-limit')
const connectDB  = require('./config/db')
const logger     = require('./utils/logger')
const { sanitize } = require('./middleware/sanitize')

const contactRoutes   = require('./routes/contact')
const bookingRoutes   = require('./routes/bookings')
const projectRoutes   = require('./routes/projects')
const authRoutes      = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')

const app = express()
connectDB()

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))

const globalLimiter  = rateLimit({ windowMs: 15*60*1000, max: 120, message: { error: 'Too many requests.' } })
const contactLimiter = rateLimit({ windowMs: 60*60*1000, max: 5,   message: { error: 'Too many contact submissions.' } })
const bookingLimiter = rateLimit({ windowMs: 60*60*1000, max: 3,   message: { error: 'Too many booking requests.' } })

app.use('/api/', globalLimiter)
app.use('/api/contact',  contactLimiter)
app.use('/api/bookings', bookingLimiter)

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(sanitize)
app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }))

app.use('/api/contact',   contactRoutes)
app.use('/api/bookings',  bookingRoutes)
app.use('/api/projects',  projectRoutes)
app.use('/api/auth',      authRoutes)
app.use('/api/analytics', analyticsRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), env: process.env.NODE_ENV })
})

app.use((req, res) => res.status(404).json({ error: 'Route not found' }))

app.use((err, req, res, next) => {
  logger.error(err.stack)
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => logger.info(`🚀 Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`))
