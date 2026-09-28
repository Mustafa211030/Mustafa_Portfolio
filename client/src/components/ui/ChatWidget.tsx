import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Zap } from 'lucide-react'

interface Message { from: 'bot' | 'user'; text: string; time: string }

function now() {
  return new Date().toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' })
}

const GREET: Message = {
  from: 'bot',
  text: "Hi! 👋 I'm Mustafa. How can I help you today? I typically reply in minutes.",
  time: now(),
}

const AUTO_REPLIES: Record<string, string> = {
  default: "Thanks for reaching out! I'll get back to you very shortly. In the meantime, feel free to book a call for a faster response.",
  pricing: "Great question! Pricing starts at $2,500 for a project. Book a free 30-min call and I'll give you an exact quote based on your requirements.",
  time: "Typical projects take 2–6 weeks depending on scope. After our discovery call I'll give you a precise timeline.",
  available: "Yes, I'm currently available for new projects! My next slot opens July 2026. Book a call to lock it in.",
  mern: "Absolutely! MERN stack (MongoDB, Express, React, Node.js) is my primary specialty. I've delivered 10+ production MERN apps.",
  hello: "Hey there! Great to hear from you. What are you looking to build?",
  hi: "Hi! 😊 What can I help you with today?",
}

function getAutoReply(msg: string): string {
  const m = msg.toLowerCase()
  if (m.includes('price') || m.includes('cost') || m.includes('pricing')) return AUTO_REPLIES.pricing
  if (m.includes('time') || m.includes('long') || m.includes('week'))     return AUTO_REPLIES.time
  if (m.includes('available') || m.includes('busy'))                       return AUTO_REPLIES.available
  if (m.includes('mern') || m.includes('react') || m.includes('node'))     return AUTO_REPLIES.mern
  if (m.includes('hello') || m.includes('hey'))                            return AUTO_REPLIES.hello
  if (m.includes('hi'))                                                     return AUTO_REPLIES.hi
  return AUTO_REPLIES.default
}

export default function ChatWidget() {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState<Message[]>([GREET])
  const [input,    setInput]    = useState('')
  const [typing,   setTyping]   = useState(false)
  const [unread,   setUnread]   = useState(1)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (open) setUnread(0)
  }, [open])

  const send = () => {
    const text = input.trim()
    if (!text) return
    setMessages(m => [...m, { from:'user', text, time: now() }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const reply = getAutoReply(text)
      setMessages(m => [...m, { from:'bot', text: reply, time: now() }])
      if (!open) setUnread(u => u + 1)
    }, 1200 + Math.random() * 800)
  }

  return (
    <>
      {/* Trigger button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 4, type: 'spring', stiffness: 300, damping: 20 }}
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-20 right-6 z-50 w-12 h-12 bg-blue-600 hover:bg-blue-700
                   rounded-full shadow-lg shadow-blue-600/35 flex items-center justify-center
                   text-white transition-colors"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{scale:0,rotate:-90}} animate={{scale:1,rotate:0}} exit={{scale:0}} transition={{duration:0.2}}><X className="w-5 h-5"/></motion.div>
            : <motion.div key="c" initial={{scale:0,rotate:90}}  animate={{scale:1,rotate:0}} exit={{scale:0}} transition={{duration:0.2}}><MessageCircle className="w-5 h-5"/></motion.div>
          }
        </AnimatePresence>
        {/* Unread badge */}
        {!open && unread > 0 && (
          <motion.span
            initial={{ scale:0 }} animate={{ scale:1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full
                       text-[10px] font-bold text-white flex items-center justify-center">
            {unread}
          </motion.span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, scale:0.92, y:16, originX:1, originY:1 }}
            animate={{ opacity:1, scale:1,    y:0  }}
            exit={{    opacity:0, scale:0.92, y:16 }}
            transition={{ duration:0.3, ease:[0.16,1,0.3,1] }}
            className="fixed bottom-36 right-6 z-50 w-80 bg-[#111827] border border-white/10
                       rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: 420 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-[#0d1525]">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm text-white flex-shrink-0">
                MS
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold">Mustafa Saeed</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-dot"/>
                  <span className="text-green-400 text-[11px]">Online — replies in minutes</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity:0, y:8 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ duration:0.3 }}
                  className={`flex ${msg.from==='user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed
                    ${msg.from==='user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-white/[0.06] text-gray-200 rounded-bl-sm'}`}
                  >
                    {msg.text}
                    <div className={`text-[10px] mt-1 ${msg.from==='user' ? 'text-blue-200/70' : 'text-gray-600'}`}>
                      {msg.time}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity:0, y:6 }}
                    animate={{ opacity:1, y:0 }}
                    exit={{ opacity:0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/[0.06] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                      {[0,1,2].map(i => (
                        <motion.div key={i}
                          animate={{ y:[-2,2,-2] }}
                          transition={{ duration:0.6, repeat:Infinity, delay:i*0.15 }}
                          className="w-1.5 h-1.5 rounded-full bg-gray-400"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef}/>
            </div>

            {/* Quick replies */}
            <div className="px-3 pb-2 flex gap-1.5 flex-wrap">
              {['Pricing?','Timeline?','Available?'].map(q => (
                <button key={q} onClick={() => { setInput(q); setTimeout(send, 100) }}
                  className="text-[11px] bg-white/[0.05] border border-white/[0.1]
                             text-gray-400 hover:text-white hover:border-white/20
                             px-2.5 py-1 rounded-full transition-colors">
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-3 pb-3">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key==='Enter') send() }}
                placeholder="Type a message..."
                className="flex-1 bg-white/[0.06] border border-white/[0.1] rounded-xl
                           px-4 py-2.5 text-sm text-white placeholder-gray-600
                           outline-none focus:border-blue-500/60 transition-colors"
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                className="w-9 h-9 bg-blue-600 hover:bg-blue-700 disabled:opacity-40
                           rounded-xl flex items-center justify-center text-white
                           transition-all flex-shrink-0"
              >
                <Send className="w-4 h-4"/>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
