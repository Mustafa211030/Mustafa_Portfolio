import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock, Video, Calendar, Globe, ChevronLeft, ChevronRight,
  CheckCircle, ArrowLeft, User, Mail, MessageSquare, ChevronDown,
} from 'lucide-react'

//  constants ─
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const SHORT_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const WEEKDAYS_MON = ['MON','TUE','WED','THU','FRI','SAT','SUN']

// 30-min slots from 09:00 to 23:30
function buildSlots(): string[] {
  const slots: string[] = []
  for (let h = 9; h < 24; h++) {
    slots.push(`${String(h).padStart(2,'0')}:00`)
    slots.push(`${String(h).padStart(2,'0')}:30`)
  }
  return slots
}
const ALL_SLOTS = buildSlots()

// fake unavailable
const UNAVAILABLE_SLOTS = new Set(['09:00','09:30','10:30','14:00','16:00','16:30'])

function to12h(t: string) {
  const [hStr, mStr] = t.split(':')
  let h = parseInt(hStr)
  const ampm = h >= 12 ? 'PM' : 'AM'
  if (h > 12) h -= 12
  if (h === 0) h = 12
  return `${h}:${mStr} ${ampm}`
}

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate() }
// Monday-first offset (0=Mon … 6=Sun)
function getMonFirstOffset(y: number, m: number) {
  const day = new Date(y, m, 1).getDay() // 0=Sun
  return day === 0 ? 6 : day - 1
}

type Step = 'calendar' | 'details' | 'confirmed'

interface Form { name: string; email: string; notes: string }

//  component ─
export default function BookCall() {
  const now   = new Date()
  const [year,  setYear]  = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [selDay,  setSelDay]  = useState<number | null>(null)
  const [selSlot, setSelSlot] = useState<string | null>(null)
  const [is24h, setIs24h] = useState(true)
  const [step,  setStep]  = useState<Step>('calendar')
  const [form,  setForm]  = useState<Form>({ name: '', email: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const daysInMonth  = useMemo(() => getDaysInMonth(year, month),  [year, month])
  const offset       = useMemo(() => getMonFirstOffset(year, month), [year, month])

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11) } else setMonth(m => m - 1)
    setSelDay(null); setSelSlot(null)
  }
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0) } else setMonth(m => m + 1)
    setSelDay(null); setSelSlot(null)
  }

  const isPast = (d: number) => {
    const check = new Date(year, month, d); check.setHours(0,0,0,0)
    const t = new Date(); t.setHours(0,0,0,0)
    return check < t
  }

  const todayDay   = now.getDate()
  const todayMonth = now.getMonth()
  const todayYear  = now.getFullYear()
  const isToday    = (d: number) => d === todayDay && month === todayMonth && year === todayYear

  const selDateLabel = selDay
    ? `${WEEKDAYS_MON[new Date(year, month, selDay).getDay() === 0 ? 6 : new Date(year, month, selDay).getDay() - 1].charAt(0) + WEEKDAYS_MON[new Date(year, month, selDay).getDay() === 0 ? 6 : new Date(year, month, selDay).getDay() - 1].slice(1).toLowerCase()} ${selDay}`
    : ''

  const handleBook = async () => {
    if (!form.name || !form.email) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/bookings', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:  form.name,
          email: form.email,
          notes: form.notes,
          date:  `${MONTHS[month]} ${selDay}, ${year}`,
          time:  selSlot,
          topic: 'Free Consultation — 30 Min Meeting',
        }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Booking failed')
      }
      setStep('confirmed')
    } catch (err: any) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  //  confirmed 
  if (step === 'confirmed') {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex flex-col">
        {/* top bar */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">MUSTAFA SAEED</span>
            </div>
          </div>
          <a href="/"
            className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1]
                       border border-white/[0.1] text-white/80 hover:text-white
                       text-sm px-4 py-2 rounded-lg transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Home
          </a>
        </div>
        <div className="flex-1 flex items-center justify-center px-6 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
            className="bg-[#111827] border border-white/[0.1] rounded-2xl p-10
                       max-w-md w-full text-center shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-5" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">You're Booked!</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your 30-minute consultation has been confirmed for{' '}
              <strong className="text-white">{MONTHS[month]} {selDay}, {year}</strong> at{' '}
              <strong className="text-white">{is24h ? selSlot : to12h(selSlot!)}
              </strong>.
              <br /><br />
              A confirmation email has been sent to{' '}
              <strong className="text-white">{form.email}</strong>.
            </p>
            <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-4 mb-6 text-left space-y-2">
              {[
                { icon: Video,    text: 'Google Meet link sent 30 min before'    },
                { icon: Clock,    text: 'Duration: 30 minutes'                   },
                { icon: Globe,    text: 'Asia/Karachi timezone (PKT, UTC+5)'     },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-gray-300">
                  <Icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
            <a href="/"
              className="w-full inline-flex items-center justify-center gap-2
                         bg-blue-600 hover:bg-blue-700 text-white font-semibold
                         text-sm px-6 py-3 rounded-xl transition-all">
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </a>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex flex-col">

      {/*  Top bar  */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">MS</span>
          </div>
        </div>
        <a href="/"
          className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1]
                     border border-white/[0.1] text-white/80 hover:text-white
                     text-sm px-4 py-2 rounded-lg transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Home
        </a>
      </div>

      {/*  Hero text  */}
      <div className="text-center pt-14 pb-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-10 bg-blue-500/60" />
          <span className="text-blue-400 text-xs font-bold tracking-[0.18em] uppercase">
            Book a Call
          </span>
          <div className="h-px w-10 bg-blue-500/60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-[clamp(32px,5vw,60px)] font-bold text-white leading-tight mb-4"
        >
          Let's Discuss Your{' '}
          <span className="text-blue-400">Project</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-gray-400 text-base max-w-lg mx-auto leading-relaxed mb-8"
        >
          Schedule a free consultation to explore how we can bring your vision to life
          with AI-powered solutions and modern web development.
        </motion.p>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          {[
            { icon: Clock,    label: '30-60 min'         },
            { icon: Video,    label: 'Video Call'        },
            { icon: Calendar, label: 'Free Consultation' },
          ].map(({ icon: Icon, label }) => (
            <div key={label}
              className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.1]
                         text-white/70 text-sm px-5 py-2 rounded-full"
            >
              <Icon className="w-3.5 h-3.5 text-blue-400" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>

      {/*  Main calendar widget  */}
      <div className="flex-1 flex items-start justify-center px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.16,1,0.3,1] }}
          className="bg-[#111827] border border-white/[0.08] rounded-2xl overflow-hidden
                     shadow-2xl w-full max-w-[900px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-[420px]">

            {/*  Left sidebar: meeting info  */}
            <div className="border-b md:border-b-0 md:border-r border-white/[0.07] p-7 flex flex-col gap-5">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700
                              flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                MS
              </div>

              <div>
                <p className="text-gray-400 text-xs mb-0.5">Mustafa Saeed</p>
                <h3 className="text-white font-bold text-xl leading-tight">30 Min Meeting</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-gray-400 text-sm">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  30m
                </div>
                <div className="flex items-center gap-2.5 text-gray-400 text-sm">
                  {/* Google Meet coloured icon */}
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M22 7l-4 4V7l4-4v4z" fill="#00832D"/>
                    <rect x="2" y="5" width="16" height="14" rx="2" fill="#0066DA"/>
                    <path d="M22 17l-4-4v4l4 4v-4z" fill="#00832D"/>
                  </svg>
                  Google Meet
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer hover:text-white transition-colors">
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  Asia/Karachi
                  <ChevronDown className="w-3 h-3 ml-0.5" />
                </div>
              </div>

              {/* Selected slot display */}
              <AnimatePresence>
                {selDay && selSlot && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{    opacity: 0, y: 6 }}
                    className="mt-auto bg-blue-600/15 border border-blue-500/25
                               rounded-xl p-3.5 text-sm"
                  >
                    <p className="text-blue-400 font-semibold">
                      {selDateLabel}, {SHORT_MONTHS[month]} {selDay}
                    </p>
                    <p className="text-white font-bold mt-0.5">
                      {is24h ? selSlot : to12h(selSlot)} — {is24h
                        ? (() => {
                            const [h, min] = selSlot.split(':').map(Number)
                            const next = min === 30
                              ? `${String(h+1).padStart(2,'0')}:00`
                              : `${String(h).padStart(2,'0')}:30`
                            return next
                          })()
                        : (() => {
                            const [h, min] = selSlot.split(':').map(Number)
                            const next = min === 30 ? `${h+1}:00` : `${h}:30`
                            return to12h(next.includes(':') ? next : next)
                          })()
                      } PKT
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/*  Right: calendar + time OR details form  */}
            <AnimatePresence mode="wait">

              {step === 'calendar' && (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{    opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-[1fr_200px]"
                >
                  {/* Calendar grid */}
                  <div className="p-7 border-b sm:border-b-0 sm:border-r border-white/[0.07]">
                    {/* Month nav */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-white font-semibold text-base">
                        <span className="text-blue-400">{SHORT_MONTHS[month]}</span>{' '}
                        {year}
                      </h3>
                      <div className="flex gap-1">
                        <button onClick={prevMonth}
                          className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.12]
                                     flex items-center justify-center text-gray-400 transition-colors">
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button onClick={nextMonth}
                          className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.12]
                                     flex items-center justify-center text-gray-400 transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Weekday headers — MON first */}
                    <div className="grid grid-cols-7 mb-2">
                      {WEEKDAYS_MON.map(d => (
                        <div key={d}
                          className="text-center text-[10px] font-bold text-gray-600
                                     uppercase tracking-wider py-1">
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Day cells */}
                    <div className="grid grid-cols-7 gap-y-1">
                      {/* Empty leading cells */}
                      {Array.from({ length: offset }).map((_, i) => (
                        <div key={`e${i}`} />
                      ))}

                      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => {
                        const past     = isPast(d)
                        const today    = isToday(d)
                        const selected = selDay === d
                        return (
                          <button
                            key={d}
                            disabled={past}
                            onClick={() => { setSelDay(d); setSelSlot(null) }}
                            className={`
                              aspect-square rounded-xl text-sm font-medium
                              flex items-center justify-center relative
                              transition-all duration-150
                              ${selected
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                : past
                                ? 'text-gray-700 cursor-not-allowed'
                                : 'text-gray-200 hover:bg-white/[0.08] hover:text-white'}
                            `}
                          >
                            {d}
                            {today && !selected && (
                              <span className="absolute bottom-1 left-1/2 -translate-x-1/2
                                               w-1 h-1 rounded-full bg-blue-500" />
                            )}
                          </button>
                        )
                      })}

                      {/* Next-month overflow days */}
                      {(() => {
                        const total = offset + daysInMonth
                        const rem = total % 7 === 0 ? 0 : 7 - (total % 7)
                        return Array.from({ length: rem }, (_, i) => (
                          <button key={`n${i}`} disabled
                            className="aspect-square rounded-xl text-sm text-gray-700
                                       flex items-center justify-center cursor-not-allowed">
                            {i + 1}
                          </button>
                        ))
                      })()}
                    </div>
                  </div>

                  {/* Time slots panel */}
                  <div className="p-5 flex flex-col">
                    {selDay ? (
                      <>
                        {/* Header: day + 12h/24h toggle */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-white font-semibold text-sm">
                            {WEEKDAYS_MON[new Date(year, month, selDay).getDay() === 0 ? 6 : new Date(year, month, selDay).getDay() - 1].charAt(0)
                             + WEEKDAYS_MON[new Date(year, month, selDay).getDay() === 0 ? 6 : new Date(year, month, selDay).getDay() - 1].slice(1).toLowerCase()}{' '}{selDay}
                          </span>
                          <div className="flex bg-white/[0.06] rounded-lg overflow-hidden text-xs">
                            <button
                              onClick={() => setIs24h(false)}
                              className={`px-2.5 py-1 font-semibold transition-colors
                                ${!is24h ? 'bg-white/[0.15] text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            >12h</button>
                            <button
                              onClick={() => setIs24h(true)}
                              className={`px-2.5 py-1 font-semibold transition-colors
                                ${is24h  ? 'bg-white/[0.15] text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            >24h</button>
                          </div>
                        </div>

                        {/* Slots list */}
                        <div className="flex-1 space-y-2 overflow-y-auto no-scrollbar max-h-[280px] pr-1">
                          {ALL_SLOTS.map(slot => {
                            const unavail  = UNAVAILABLE_SLOTS.has(slot)
                            const selected = selSlot === slot
                            const label    = is24h ? slot : to12h(slot)
                            return (
                              <button
                                key={slot}
                                disabled={unavail}
                                onClick={() => setSelSlot(slot)}
                                className={`
                                  w-full py-2.5 rounded-xl border text-sm font-medium
                                  transition-all duration-150
                                  ${selected
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/25'
                                    : unavail
                                    ? 'border-white/[0.04] text-gray-700 cursor-not-allowed'
                                    : 'border-white/[0.12] text-gray-300 hover:border-blue-500/50 hover:text-white hover:bg-blue-600/10'}
                                `}
                              >
                                {label}
                              </button>
                            )
                          })}
                        </div>

                        {/* Continue button */}
                        {selSlot && (
                          <motion.button
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => setStep('details')}
                            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white
                                       font-semibold text-sm py-3 rounded-xl transition-all"
                          >
                            Continue →
                          </motion.button>
                        )}
                      </>
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-center">
                        <div>
                          <Calendar className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                          <p className="text-gray-600 text-sm">Select a date</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{    opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 flex flex-col justify-center"
                >
                  <button
                    onClick={() => setStep('calendar')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white
                               text-sm mb-6 w-fit transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <h3 className="text-white font-bold text-xl mb-1">Enter your details</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    {MONTHS[month]} {selDay}, {year} · {is24h ? selSlot : to12h(selSlot!)} PKT
                  </p>

                  {submitError && (
                    <div className="bg-red-500/10 border border-red-500/25 text-red-400
                                    text-sm rounded-xl px-4 py-3 mb-4">
                      {submitError}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase
                                        tracking-wider block mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2
                                         w-4 h-4 text-gray-600" />
                        <input
                          name="name" value={form.name} onChange={handle} required
                          placeholder="Your full name"
                          className="w-full bg-white/[0.05] border border-white/[0.1]
                                     rounded-xl pl-10 pr-4 py-3 text-sm text-white
                                     placeholder-gray-600 outline-none
                                     focus:border-blue-500/60 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase
                                        tracking-wider block mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2
                                         w-4 h-4 text-gray-600" />
                        <input
                          name="email" type="email" value={form.email}
                          onChange={handle} required
                          placeholder="you@company.com"
                          className="w-full bg-white/[0.05] border border-white/[0.1]
                                     rounded-xl pl-10 pr-4 py-3 text-sm text-white
                                     placeholder-gray-600 outline-none
                                     focus:border-blue-500/60 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase
                                        tracking-wider block mb-1.5">
                        What do you want to discuss?
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-3.5
                                                   w-4 h-4 text-gray-600" />
                        <textarea
                          name="notes" value={form.notes} onChange={handle}
                          rows={3}
                          placeholder="Brief description of your project…"
                          className="w-full bg-white/[0.05] border border-white/[0.1]
                                     rounded-xl pl-10 pr-4 py-3 text-sm text-white
                                     placeholder-gray-600 outline-none resize-none
                                     focus:border-blue-500/60 transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleBook}
                      disabled={!form.name || !form.email || submitting}
                      className="w-full bg-blue-600 hover:bg-blue-700
                                 disabled:opacity-40 disabled:cursor-not-allowed
                                 text-white font-bold text-sm py-3.5 rounded-xl
                                 transition-all flex items-center justify-center gap-2
                                 shadow-lg shadow-blue-600/20"
                    >
                      {submitting ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white
                                         rounded-full animate-spin" />
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Confirm Booking
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cal.com-style footer */}
          <div className="border-t border-white/[0.06] py-3 text-center">
            <span className="text-gray-700 text-xs tracking-wide">mustafasaeed.dev</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
