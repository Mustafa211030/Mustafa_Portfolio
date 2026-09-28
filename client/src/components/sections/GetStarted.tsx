import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, AlertCircle, Calendar } from 'lucide-react'
import { OWNER, BUDGET_OPTIONS } from '@/lib/constants'

const VP = { once: true, margin: '-50px' } as const
type Status = 'idle'|'loading'|'success'|'error'

export default function GetStarted() {
  const [form,   setForm]   = useState({ name:'', email:'', company:'', budget:'', message:'' })
  const [status, setStatus] = useState<Status>('idle')
  const [errMsg, setErrMsg] = useState('')

  const handle = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading'); setErrMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error||'Error') }
      setStatus('success')
      setForm({ name:'', email:'', company:'', budget:'', message:'' })
    } catch (err: any) { setStatus('error'); setErrMsg(err.message) }
  }

  return (
    <section id="contact" className="bg-[#f0f4f8] py-20">
      <div className="site-container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left CTA */}
          <motion.div initial={{opacity:0,x:-32}} whileInView={{opacity:1,x:0}} viewport={VP} transition={{duration:0.7}}>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-0.5 bg-blue-500 rounded"/>
              <span className="text-[11px] font-bold tracking-[0.1em] text-blue-500 uppercase">Get Started</span>
            </div>
            <h2 className="text-[clamp(32px,4.2vw,56px)] font-bold leading-[1.05] text-gray-900">
              Ready to Build<br/><span className="text-blue-500">Something Great?</span>
            </h2>
            <p className="text-gray-500 text-[15px] mt-4 max-w-sm leading-relaxed">
              Let's discuss your next project. Book a free consultation or send me a message and I'll reply within 2 hours.
            </p>
            <motion.a href="/book-call"
              whileHover={{ scale:1.02, y:-2 }} whileTap={{ scale:0.98 }}
              className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700
                         text-white px-7 py-3.5 rounded-lg font-semibold text-[15px]
                         mt-9 transition-all hover:shadow-xl hover:shadow-blue-600/25"
            >
              <Calendar className="w-4 h-4"/>
              Book Free 30-Min Call
              <ArrowRight className="w-4 h-4"/>
            </motion.a>
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 pulse-dot"/>
              Usually responds within 2 hours
            </div>
            <div className="mt-9 grid grid-cols-3 gap-3">
              {[{val:'2+',lbl:'Years Experience'},{val:'10+',lbl:'Projects Done'},{val:'98%',lbl:'Success Rate'}].map(b=>(
                <div key={b.lbl} className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-gray-900">{b.val}</div>
                  <div className="text-[11px] text-gray-400 mt-1">{b.lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div initial={{opacity:0,x:32}} whileInView={{opacity:1,x:0}} viewport={VP} transition={{duration:0.7,delay:0.1}}>
            {status === 'success' ? (
              <div className="bg-white rounded-2xl border border-green-100 p-12 text-center shadow-sm">
                <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4"/>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm mb-6">I'll get back to you within 2 hours.</p>
                <button onClick={()=>setStatus('idle')} className="text-sm text-blue-600 hover:underline">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Send a Message</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Or <a href="/book-call" className="text-blue-500 hover:underline font-medium">book a call</a> to talk directly.
                </p>
                {status==='error' && (
                  <div className="flex items-center gap-2 bg-red-50 text-red-600 rounded-lg px-4 py-3 text-sm border border-red-100">
                    <AlertCircle className="w-4 h-4 flex-shrink-0"/>{errMsg}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-1.5">Name *</label>
                    <input name="name" value={form.name} onChange={handle} required placeholder="Your name"
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-400 transition-colors"/>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-1.5">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handle} required placeholder="you@company.com"
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-400 transition-colors"/>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-1.5">Company</label>
                    <input name="company" value={form.company} onChange={handle} placeholder="Company name"
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-400 transition-colors"/>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-1.5">Budget</label>
                    <select name="budget" value={form.budget} onChange={handle}
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none bg-white focus:border-blue-400 transition-colors">
                      {BUDGET_OPTIONS.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 block mb-1.5">Message *</label>
                  <textarea name="message" value={form.message} onChange={handle} required rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none resize-none focus:border-blue-400 transition-colors"/>
                </div>
                <button type="submit" disabled={status==='loading'}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2">
                  {status==='loading'
                    ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                    : <>Send Message <ArrowRight className="w-4 h-4"/></>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
